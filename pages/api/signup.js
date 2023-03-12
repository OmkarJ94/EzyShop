// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../Models/User"
require("../../db/conn")
var CryptoJS = require("crypto-js");
export default async function handler(req, res) {
    const { name, email, password, cpassword, phone, address } = req.body

    if (req.method === "POST") {
        let user = await User.findOne({ email })
        if (user) {
            console.log(user)
            user.address = address;
            user.phone = phone;
            let status = await user.save();
            if (status) {
                res.status(200).json({ "status": "true", message: "Your Details Updated Successfully" })
            } else {
                res.status(203).json({ "status": "false", message: "Something Went Wrong" })

            }
            return;
        }


        try {
            if (password != cpassword) {
                console.log("here")
                res.status(500).json({ "status": "error" })
                return;
            }

            const data = new User({
                name, email, password: CryptoJS.AES.encrypt(password, process.env.KEY).toString(), cpassword: CryptoJS.AES.encrypt(cpassword, process.env.KEY).toString()
            })

            await data.save();
            res.status(200).json({ "status": "add" })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ "status": "error" })
        }

    }

    else {

        res.status(500).json({ "status": "error" })
    }
}
