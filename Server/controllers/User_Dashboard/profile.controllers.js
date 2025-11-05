const prisma = require('../../db/config');

const Profile = async (req, res) => {
    try
    {
        const {firstName,lastName,email,phone,city,experience,summary} = req.body;
        const user = await prisma.profile_user.create({
            data : {
                firstName,
                lastName,
                email,
                phone,
                city,
                experience,
                summary
            }
        })
        return res.status(200).json({
            message : "Profile Created Successfully",
            user 
        })

    }
    catch (err) 
    {
        res.status(500).json({ error: 'Internal server error',err : err.message});
    }
}

module.exports = {Profile};