// import Product from "../../Models/Product"
// import connectDb from "../../db/conn"

require("../../db/conn")
import Order from "../../Models/Order"


const handler = async (req, res) => {
    let products = await Order.find({})



}
export default handler