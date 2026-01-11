const prisma = require('../../db/config');

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, email, phone, city, experience, summary } = req.body;

        const user = await prisma.profile_user.upsert({
            where: { userId: userId },
            update: {
                firstName,
                lastName,
                email,
                phone,
                city,
                experience,
                summary
            },
            create: {
                userId,
                firstName,
                lastName,
                email,
                phone,
                city,
                experience,
                summary
            }
        });

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user
        });

    } catch (err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ error: 'Internal server error', err: err.message });
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await prisma.profile_user.findUnique({
            where: { userId: userId }
        });

        if (!profile) {
            return res.status(200).json({ message: "No profile found", user: null });
        }

        return res.status(200).json({ user: profile });
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ error: 'Internal server error', err: err.message });
    }
}

module.exports = { updateProfile, getProfile };