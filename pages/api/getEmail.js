import Order from "../../Models/Order"
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const { token } = req.body;
            var decoded = jwt.verify(token, process.env.KEY);

            res.status(200).json({ data: decoded.email });
        } catch (error) {
            res.status(500).json({ "status": "error" });
        }
    }
}
