import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        // Look for both cases of the token header
        const dToken = req.headers.dtoken || req.headers.dToken;
        if (!dToken) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
        req.body.docId = token_decode.id; // Keeping docId in req.body

        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ success: false, message: 'Invalid or Expired Token. Login Again.' });
    }
};

export default authDoctor;