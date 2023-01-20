// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Razorpay = require('razorpay');
var crypto = require("crypto");
import Product from "../../Models/Prod"
require("../../Middleware/conn")
import Order from "../../Models/Order"


export default async function handler(req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const
        body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.secret)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        const order = await Order.findOne({ orderId: razorpay_order_id })
        order.status = "paid";
        order.paymentInfo = req.body
        await order.save();

        let products = order.products;

        for (let item in products) {
            await Product.findOneAndUpdate({ slug: item }, { $inc: { "availableQty": - products[item].qty } });
        }
        res.redirect("/orders?clearcart=1", 200)
    }
    else {
        const order = await Order.findOne({ orderId: razorpay_order_id })

        order.status = "pending";
        order.paymentInfo = req.body
        await order.save();
        res.status(500).json({ "status": "false" })

    }


}
