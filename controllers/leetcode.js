const leetcodeModule = require('./../utils/leetcode');

module.exports.getRating = async (req, res) => {

    try {
        // console.log((Number)(req.body.rank));

        console.log(req.query);

        const rating = await leetcodeModule.getRating(req.query.leetcode);

        

        // const weakTags = await leetcodeModule.get_problems((Number)(rating));
        console.log(rating);
        return res.status(200).json({
            content: rating
        });

    } catch (error) {
        res.status(500).json({
            description: 'User rating could not be retrieved due to unexpected error ' + `${error.message}`
        });
    }

}

module.exports.getTags = async (req, res) => {

    try {
        // console.log((Number)(req.body.rank));

        console.log(req.query);

        const rating = await leetcodeModule.getRating(req.query.leetcode);

        

        const weakTags = await leetcodeModule.get_problems((Number)(rating));
        console.log(rating);
        return res.status(200).json({
            content: weakTags
        });

    } catch (error) {
        res.status(500).json({
            description: 'User profile could not be retrieved due to unexpected error ' + `${error.message}`
        });
    }

}