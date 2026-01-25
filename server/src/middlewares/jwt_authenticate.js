import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const jwt_Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.jwtoken;
        if (!token) return res.status(401).send('Unauthorised:_NO_token_provided');

        if (process.env.JWT_KEY) {
            const verifyToken = jwt.verify(token, process.env.JWT_KEY);
            if (verifyToken && typeof verifyToken === 'object' && '_id' in verifyToken) {
                const payload = verifyToken;
                const rootUser = await User.findOne({
                    _id: payload._id,
                    'tokens.token': token,
                });

                if (!rootUser) return res.status(401).send('Unauthorised:_NO_token_provided');

                req.token = token;
                req.rootUser = rootUser;
                req.userID = rootUser._id;
                return next();
            } else {
                console.error('Invalid JWT payload');
                return res.status(401).send('Unauthorised:_Invalid_token');
            }
        } else {
            console.error('No secret key provided in process.env.JWT_KEY');
            return res.status(500).send('Server misconfigured');
        }
    } catch (err) {
        console.error(err);
        return res.status(400).send('Unauthorised:_NO_token_provided');
    }
};

export default jwt_Authenticate;