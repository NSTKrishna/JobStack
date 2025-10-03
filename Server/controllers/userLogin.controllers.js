const prisma = require('../db/config.js')

const {setUser} = require('../utils/auth.js')


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


        const token = setUser(user)
        res.cookie('jwt',token ,{
            maxAge : 60 * 1000 // 1 minute // later
        })

        res.status(200).json({
            message: 'Login successful',
            user
        })
    }catch (err){
        res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        })
    }
}

module.exports = {
    UserLogin
}