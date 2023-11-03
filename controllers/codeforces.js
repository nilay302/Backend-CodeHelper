const codeforcesModule = require('./../utils/codeforces');

module.exports.getProfile = async (req, res) => {

    try {

        const userDetails = await codeforcesModule.userDetails(req.body.codeforces, true);
        return res.status(200).json({
            content: userDetails
        });

    } catch (error) {
        res.status(500).json({
            description: 'User profile could not be retrieved due to unexpected error ' + `${error.message}`
        });
    }

}

module.exports.getTags = async (req, res) => {

    try {

        const weakTags = await codeforcesModule.getTags(req.body.codeforces, req.body.rank);
        return res.status(200).json({
            content: weakTags
        });

    } catch (error) {
        res.status(500).json({
            description: 'User profile could not be retrieved due to unexpected error ' + `${error.message}`
        });
    }

}