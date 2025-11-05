prisma = require("../../db/config");

const Application = async (req, res) => {
    try
    {
        const {userId,jobId} = req.body;

        const exist = await prisma.applications.findFirst({
            where : {
                userId : userId,
                jobId : jobId
            }
        })

        if (exist) {
            return res.status(400).json({
                message: "You have already applied for this job"
            })
        }

        const application = await prisma.Applications.create({
            data : {
                userId : userId,
                jobId : jobId
            },include : {
                job : true
            }
        })

        return res.status(200).json({
            message: "Application Submitted Successfully",
            application
        })


    }
    catch (err)
    {
        res.status(500).json({
            message: "Internal Server Error",
            err : err.message
        })
    }
}

module.exports = { Application };