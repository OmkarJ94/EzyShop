
import mongoose from 'mongoose';
//URI=mongodb://localhost:27017/CODESWEAR
//  URI=mongodb+srv://omkar:Omkar%40123@cluster0.w9wbo.mongodb.net/CODESWEAR?retryWrites=true&w=majority
mongoose.connect(process.env.URI).then(() => {
    console.log('connect')
})
    .catch((err) => {
        console.log(err.message)
    })
