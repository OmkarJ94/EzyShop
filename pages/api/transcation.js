const Razorpay = require('razorpay');
require("../../Middleware/conn")
import Order from "../../Models/Order"
import Product from "../../Models/Prod"

export default async function transcation(req, res) {
    if (req.method === "POST") {

        try {

            const { name, cart, email, address, subTotal, phone } = req.body;
            var instance = new Razorpay({
                key_id: process.env.NEXT_PUBLIC_key_id,
                key_secret: process.env.secret,
            });
            if (phone.length != 10) {
                res.status(203).json({ message: "Check The Phone Number" })
                return;
            }
            let sumPrice = 0;
            for (let item in cart) {

                let product = await Product.findOne({ slug: item })
                sumPrice += cart[item].price * cart[item].qty;
                if (product.availableQty < cart[item].qty) {
                    res.status(203).json({ message: `Sorry Only ${cart[item].qty} Items of ${product.title} Are Not Available` })
                    return;
                }

                if (product.price != cart[item].price) {
                    res.status(200).json({ message: "Something Went Wrong" })
                    return;
                }
            } if (sumPrice !== subTotal) {
                res.status(200).json({ message: "Something Went Wrong" })
                return;

            }


            var options = {
                amount: Number(req.body.subTotal * 100),  // amount in the smallest currency unit
                currency: "INR",

            };

            const order = await instance.orders.create(options)
            const createorder = new Order({ name, email, orderId: order.id, address, ammount: subTotal, products: cart });
            await createorder.save()

            if (order) {

                res.status(201).json({ "status": "Your Order Placed Successfully", order });
            }
            else {
                res.status(500).json({ "status": "false" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error" })
        }
    }

}
