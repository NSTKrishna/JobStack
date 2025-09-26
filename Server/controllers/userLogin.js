const prisma = require('../db/config.js')
const UserLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            res.status(401).json({
                message: 'Invalid email or password',user
            })
        }    
        res.status(200).json({
            message: 'Login successful',
            user
        })
    }catch (err){
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    UserLogin
}