import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function cookieJwtAuth(req, res, next) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(err) {
        res.clearCookie("token");
        return res.sendStatus(403);
    }
}