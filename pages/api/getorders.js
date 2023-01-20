// import Product from "../../Models/Product"
// import connectDb from "../../Middleware/conn"

require("../../Middleware/conn")
import Order from "../../Models/Order"


const handler = async (req, res) => {
    let products = await Order.find({})



}
export default handler