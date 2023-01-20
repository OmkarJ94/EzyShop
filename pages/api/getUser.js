import jwt from 'jsonwebtoken';
import User from '../../Models/User'
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let { token } = req.query
            var decoded = jwt.verify(token, process.env.KEY);
            let user = await User.findOne({ email: decoded.email })
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ "status": "false" })
        }
    }
}
