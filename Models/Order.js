const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: Object,
        default: {}
    },
    products: { type: Object, required: true },
    address: {
        type: String,
        required: true
    },
    ammount: { type: Number, required: true },
    status: {
        type: String,
        default: "Intiated",
        required: true
    },
    deliveryStatus: {
        type: String,
        default: "Not Shipped",
        required: true
    },
    time: {
        type: String,
        default: new Date().toLocaleString()
    }


}, { timestamp: true })
mongoose.models = {}
export default mongoose.model("Order", OrderSchema)