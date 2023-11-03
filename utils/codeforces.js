const axios = require('axios');
// const random = require('random');

var completedProblems = {};

async function userDetails(codeforcesHandl, clearPastProblems) {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforcesHandl}`);
    console.log(response);
    var codeforcesHandle = response.data.result[0];

    if (response.data.status !== 'OK') {
      return false;
    }

    if (clearPastProblems) {
      completedProblems = {};
    }

    return codeforcesHandle;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

function convertUnixTime(unixtime) {
  const date = new Date(unixtime * 1000);
  date.setHours(date.getHours() + 5); // Adjust for UTC+5:30 timezone
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function convertToHour(secondsTime) {
  return new Date(secondsTime * 1000).toISOString().substr(11, 8);
}

async function contestDetails() {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result;
    const contestList = [];

    for (let i = contests.length - 1; i >= 0; i--) {
      const contest = contests[i];

      if (contest.phase === 'FINISHED') {
        break;
      }

      contest.startTimeSeconds = convertUnixTime(contest.startTimeSeconds);
      contest.durationSeconds = convertToHour(contest.durationSeconds);
      contestList.push(contest);
    }

    return contestList.slice(0, 5);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getTags(codeforcesHandle, rank) {
  try {
    var response = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesHandle}`);
    var submissions = response.data.result;
    var visitedProblems = {};
    var wrongSubmissions = {};

    for (const problem of submissions) {
      if (problem.verdict !== 'OK') {
        if (visitedProblems[problem.problem.name]) {
          continue;
        }
        visitedProblems[problem.problem.name] = 1;
        for (const tag of problem.problem.tags) {
          if (!wrongSubmissions[tag]) {
            wrongSubmissions[tag] = 1;
          } else {
            wrongSubmissions[tag] += 1;
          }
        }
      } else {
        completedProblems[problem.problem.name] = 1;
      }
    }

    var sortedTags = Object.entries(wrongSubmissions)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);

    var req_problem_tags = sortedTags.slice(0, 2);
    var weakTags = {};
    var min_rating = rank - 100;
    var max_rating = rank + 300;

    if (rank < 1000) {
      req_problem_tags.push('brute force', 'sorting', 'math');
    }
    if (rank < 1200) {
      req_problem_tags.push('sorting', 'math', 'greedy', 'implementation', 'constructive algorithms');
    } else if (rank < 1400) {
      req_problem_tags.push('number theory', 'greedy', 'constructive algorithms', 'binary search');
    } else if (rank < 1600) {
      req_problem_tags.push('strings', 'binary search', 'dp', 'combinatorics');
    } else if (rank < 1900) {
      req_problem_tags.push('dp', 'graphs', 'trees', 'dfs and similar');
    } else if (rank < 2100) {
      req_problem_tags.push('dp', 'graphs', 'trees', 'dfs and similar');
    } else if (rank < 2400) {
      req_problem_tags.push('dp', 'graphs', 'fft', 'geometry');
    } else if (rank < 2600) {
      req_problem_tags.push('dp', 'graphs', 'trees', 'dfs and similar');
    } else {
      req_problem_tags.push('dp', 'graphs', 'trees', 'dfs and similar');
    }

    for (const tag of req_problem_tags) {
      weakTags[tag] = await getProblems(tag, rank, min_rating, max_rating);
      if (Object.keys(weakTags).length === 7) {
        break;
      }
    }

    return weakTags;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}

function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up to the nearest integer
    max = Math.floor(max); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function getProblems(tag, rank, min_rating, max_rating) {
  try {
    const response = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${tag}`);
    const allData = response.data.result;
    const allProblems = allData.problems;
    const allproblemStatistics = allData.problemStatistics;

    let count = 0;
    const lengthOfProblemSet = allProblems.length;
    const alreadySuggested = {};
    var problems = [];

    for (let j = 0; j < lengthOfProblemSet; j++) {
      let i = getRandomInt(0, lengthOfProblemSet - 1);

      if (allProblems[i].points <= 1000 || allProblems[i].index === 'A') {
        continue;
      }

      if (tag in allProblems[i].tags &&
          !alreadySuggested[allProblems[i].name] &&
          !completedProblems[allProblems[i].name] &&
          allProblems[i].rating >= min_rating &&
          allProblems[i].rating <= max_rating) {
        alreadySuggested[allProblems[i].name] = 1;
        problems.push([allProblems[i].name, `https://codeforces.com/problemset/problem/${allProblems[i].contestId}/${allProblems[i].index}`]);
        count++;
      }

      if (count === 6) {
        break;
      }
    }

    return problems;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

module.exports = {
  userDetails,
  contestDetails,
  getTags,
  getProblems,
};
