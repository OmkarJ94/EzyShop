import User from "../../Models/User"
require("../../Middleware/conn")
var CryptoJS = require("crypto-js");
import Otp from "../../Models/Otp"

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { email, password, cpassword, otp } = req.body;
            console.log(email, password, cpassword, otp)
            let user = await User.findOne({ email });
            let result = await Otp.findOne({ Otp: otp, email: email });
    
            if (result && user) {
                user.password = CryptoJS.AES.encrypt(password, process.env.KEY).toString()
                user.cpassword = CryptoJS.AES.encrypt(cpassword, process.env.KEY).toString()
                await user.save();
                res.status(200).json({ message: 'Your Password was successfully updated' })
            }
            else {
                res.status(500).json({ message: "Something Went Wrong" })

            }
        } catch (error) {
            res.status(500).json({ message: "Something Went Wrong" })
        }
    }
    else {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
