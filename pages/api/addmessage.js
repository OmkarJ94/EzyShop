import jwt from 'jsonwebtoken';
import User from '../../Models/User'
import mongoose from 'mongoose';
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { email, subject, message } = req.body
            
            let user = await User.findOne({ email })
            

            user.messages.push({
                email, message, subject
            })
            user.save()
            res.status(200).json({ "message": "message added successfully" })
        } catch (error) {
            
            res.status(500).json({ "status": "false" })
        }
    }
}
