
const Razorpay = require('razorpay');
require("../../db/conn")

import Order from "../../Models/Prod"
export default async function transcation(req, res) {
    if (req.method === "GET") {

        try {
            let orders = await Order.find({});
            
            res.status(200).json(orders)
        } catch (error) {
            
            res.status(500).json({ status: "error" })
        }
    }

}
