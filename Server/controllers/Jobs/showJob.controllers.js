const prisma = require("../../db/config");

const ShowJobs = async (req, res) => {
    try 
    {
        const jobs = await prisma.job.findMany();
        const show = await prisma.show_Job.create({
            data : {
                id: show.id,
                jobTitle: jobs.jobTitle,
                jobType: jobs.jobType,
                department: jobs.department,
                location: jobs.location,
                salary: jobs.salary,
                description: jobs.description,
                requirement: jobs.requirement
            }
        })
        res.status(200).json({
            message: "Jobs Retrieved Successfully",
            show
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

module.exports = { ShowJobs };