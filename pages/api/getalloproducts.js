
const Razorpay = require('razorpay');
require("../../Middleware/conn")
console.log("here")
import Order from "../../Models/Prod"
export default async function transcation(req, res) {
    if (req.method === "GET") {

        try {
            let orders = await Order.find({});
            console.log(orders)
            res.status(200).json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error" })
        }
    }

}
