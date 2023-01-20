import Order from "../../Models/Order"
import jwt from 'jsonwebtoken';
require("../../Middleware/conn")
export default async function handler(req, res) {
    try {
        const { token, slug, orderId } = req.body;

        var decoded = jwt.verify(token, process.env.KEY);
        const data = await Order.findOne({ email: decoded.email, orderId })
        res.status(200).json({ response: data });

    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error" });
    }
}
