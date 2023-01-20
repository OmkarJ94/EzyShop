var crypto = require("crypto");
const Razorpay = require('razorpay');

export const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API,
});
export default async function paymentverification(req, res) {
    if (req.method === "POST") {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_API)
            .update(body.toString())
            .digest('hex');


        var response = { "signatureIsValid": "false" }
        if (expectedSignature === razorpay_signature) {

        }
        else {
            res.status(500).json({ status: 'error' })

        }


    }
    else {
        res.status(500).json({ status: 'error' })

    }
}
