
require("../../db/conn")
import Product from "../../Models/Prod"
const handler = async (req, res) => {
    if (req.method === "POST") {
    
        for (let i = 0; i < req.body.length; i++) {

            const data = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
        }
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ success: "This is not allowed" })
    }
}

export default handler