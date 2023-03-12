// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../Models/User"
require("../../db/conn")
var jwt = require('jsonwebtoken');

var CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    const { email, password } = req.body


    if (req.method === "POST") {
        const response = await User.findOne({ email: email });

        const bytes = CryptoJS.AES.decrypt(response.password, process.env.KEY);
        var originalpassword = bytes.toString(CryptoJS.enc.Utf8);

        if (email === response.email && password === originalpassword) {
            var token = jwt.sign({ success: true, email: response.email, name: response.name }, process.env.KEY, { expiresIn: "2d" });
            res.status(200).json({ token })
        }
        else {

            res.status(500).json({ "status": "error" })
        }
    }
    else {
        res.status(500).json({ "status": "error" })
    }
}
