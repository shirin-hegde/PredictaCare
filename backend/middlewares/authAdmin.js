import jwt from 'jsonwebtoken'

const authAdmin = async (req,res,next) => {
    try{
        // Look for both cases of the token header
        const aToken = req.headers.atoken || req.headers.aToken
        if (!aToken) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.verify(aToken,process.env.JWT_SECRET)
        
        const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        if(token_decode !== expected) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        next()
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authAdmin