import jwt from 'jsonwebtoken';
import User from '../../Models/User'
var CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { password, cpassword, token } = req.body;

            var decoded = jwt.verify(token, process.env.KEY);
            let user = await User.findOne({ email: decoded.email })

            const data = await User.findOneAndUpdate({ email: decoded.email }, { password: CryptoJS.AES.encrypt(password, process.env.KEY).toString(), cpassword: CryptoJS.AES.encrypt(cpassword, process.env.KEY).toString() })

            if (data) {
                res.status(200).json({ "message": "Password Changed Successfully" })
            }
            else {
                res.status(203).json({ "message": "Something Went Wrong" })

            }
        } catch (error) {
            res.status(203).json({ "message": "Something Went Wrong" })

        }
    }
    else {

    }
}
