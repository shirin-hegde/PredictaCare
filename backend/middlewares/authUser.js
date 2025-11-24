import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    try{
        // Look for both cases of the token header
        const token = req.headers.token || req.headers.Token;
        if (!token) {
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        req.body.userId=token_decode.id
        next()
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser