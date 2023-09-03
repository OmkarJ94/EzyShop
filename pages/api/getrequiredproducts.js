// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../Models/Prod"
export default async function handler(req, res) {
    try {
        const { color, size, category } = req.body
        
        const products = await Product.find({ color, size, category })
        
        res.status(200).send(products)
    } catch (error) {
        
        res.status(500).json({ "message": "error" })
    }
}
