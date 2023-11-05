const codeforcesModule = require('./../utils/codeforces');

module.exports.getProfile = async (req, res) => {

    try {

        console.log(req.params.codeforces);
        const userDetails = await codeforcesModule.userDetails(req.query.codeforces, true);
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
        // console.log((Number)(req.body.rank));
        const weakTags = await codeforcesModule.getTags(req.query.codeforces, (Number)(req.query.rank));
        return res.status(200).json({
            content: weakTags
        });

    } catch (error) {
        res.status(500).json({
            description: 'User profile could not be retrieved due to unexpected error ' + `${error.message}`
        });
    }

}