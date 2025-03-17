import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.doctorId = decoded.doctorId;
        next();
    } catch (error) {
        res.status(401).json('Invalid Token');
    }
}

export default verifyToken;