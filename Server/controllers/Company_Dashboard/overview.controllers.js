const prisma = require("../../db/config");

const Overview = async (req, res) => {
    try 
    {
        const jobs = await prisma.job.findMany({
            include : {
                company : true
            }
        })
        const Active_jobs = jobs.length;
        
        const Active_applications = await prisma.applications.findMany({
            include : {
                job : true
            }
        })
        const Active_applications_count = Active_applications.length

        const now = new Date();
        const curr_mon = new Date(now.getFullYear(), now.getMonth(), 1);
        const last_mon = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const monthly_applications = await prisma.applications.count({
            where : {
                appliedAt : {
                    gte : curr_mon,
                    lt : last_mon
                }
            }
        })

        res.status(200).json({
            message : "Overview Data Fetched Successfully",
            Active_jobs,
            Active_applications_count,
            monthly_applications
        })
    }
    catch (err)
    {
        res.status(500).json({
            message : 'Internal Server Error',
            err : err.message
        })
    }
}

module.exports = { Overview };