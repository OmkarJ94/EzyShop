import Order from "../../Models/Order"
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
require("../../db/conn")
export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const { token } = req.body;
            var decoded = jwt.verify(token, process.env.KEY);
            const data = await Order.find({ email: decoded.email })
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ "status": "error" });
        }
    }
}
