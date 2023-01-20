
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({

    title: {
        type: String,

    },
    slug: {
        type: String,
        unique: true,

    },
    desc: { type: String },
    img: { type: String },
    category: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number },
    availableQty: { type: Number },
})
mongoose.models = {}
export default mongoose.model("Product", ProductsSchema)