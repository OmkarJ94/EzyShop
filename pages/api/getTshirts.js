// import Product from "../../Models/Product"
// import connectDb from "../../db/conn"

require("../../db/conn")
import Product from "../../Models/Prod"


const handler = async (req, res) => {
    try {
        let products = await Product.find({ category: "T-shirts" })

        let data = {};

        for (let ele of products) {

            if (ele.title in data) {

                if (!(data[ele.title].color.includes(ele.color)) && ele.availableQty > 0) {
                    data[ele.title].color.push(ele.color)
                }
                if (!(data[ele.title].size.includes(ele.size)) && ele.availableQty > 0) {
                    data[ele.title].size.push(ele.size)
                }
            }
            else {

                data[ele.title] = JSON.parse(JSON.stringify(ele));
                if (ele.availableQty > 0) {
                    data[ele.title].color = [ele.color];
                    data[ele.title].size = [ele.size];
                }
            }
        }

        res.status(200).send(data)
    } catch (error) {

        res.status(500).json({ "status": "false" })
    }

}
export default handler