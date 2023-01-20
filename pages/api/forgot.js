import otp from "../../Models/Otp"
import nodemailer from "nodemailer"
import User from "../../Models/User"
require("../../Middleware/conn")
const mailer = (mail, otp, body) => {

    try {

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject: 'Email For Forgot Password',
            html: body
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {
                console.log(err)
                return false;
            } else {
                console.log(data)
                return true
            }
        })
    } catch (error) {
        console.log(error)

    }
}


export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { email } = req.body;

            if (!email) {
                return res.status(404).json({ error: "User Not Found" });
            }
            const code = Math.floor(Math.random() * 10000 + 1);
            let body = ` We have sent you this email in response to your request to reset your password on Coedswear.com
         After you reset your password, any credit card information stored in My Account will be deleted as a security measure.

        <br/><br/>

        To reset your password, please follow the link below:

        <a href="https://codeswear-oj86029-gmailcom.vercel.app/changepassword?email=${email}">Click here</a>

        <br/><br/>

        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and chnage your password.

        <br/><br/>
        <h1>Otp to change the password : <b>${code}</b></h1>
        <h3>This otp valid only for 5 minutes</h3>
        
        `;
            const result = await User.findOne({ email: email });

            if (result) {
                let Code = new otp({
                    email,
                    Otp: code,
                    expireIn: new Date().getTime() + 300 * 1000,
                });
                const response = await Code.save();
                mailer(email, code, body);


                res.status(200).json({ message: "OTP Send Your Mail Id" });

            } else {
                res.status(404).json({ message: "User Not Found" });
            }
        } catch (error) {
            console.log(error)

            res.status(404).json({ message: "Something Went Wrong" });
        }
    } else {
        res.status(404).json({ message: "Something Went Wrong" });
    }
}


