const prisma = require('./Server/db/config');

async function migrateData() {
    try {
        const targetCompanyId = 5;
        const sourceCompanyId = 1;

        console.log(`Migrating data from Company ${sourceCompanyId} to Company ${targetCompanyId}...`);

        // 1. Move Jobs (optional, but keeps data consistent)
        const updatedJobs = await prisma.job.updateMany({
            where: { companyId: sourceCompanyId },
            data: { companyId: targetCompanyId }
        });
        console.log(`Migrated ${updatedJobs.count} jobs.`);

        // 2. Move Applications
        const updatedApps = await prisma.applications.updateMany({
            where: { companyId: sourceCompanyId },
            data: { companyId: targetCompanyId }
        });
        console.log(`Migrated ${updatedApps.count} applications.`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateData();
