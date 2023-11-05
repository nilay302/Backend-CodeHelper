const leetcodeModule = require('./../utils/leetcode');

// module.exports.getProfile = async (req, res) => {

//     try {

//         const userDetails = await leetcodeModule.userDetails(req.body.leetcode, true);
//         return res.status(200).json({
//             content: userDetails
//         });

//     } catch (error) {
//         res.status(500).json({
//             description: 'User profile could not be retrieved due to unexpected error ' + `${error.message}`
//         });
//     }

// }

module.exports.getTags = async (req, res) => {

    try {
        // console.log((Number)(req.body.rank));

        console.log(req.body.leetcode);

        const rating = await leetcodeModule.getRating(req.body.leetcode);

        

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