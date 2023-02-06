
import mongoose from 'mongoose';
mongoose.connect(process.env.URI).then(() => {
    console.log('connect')
})
    .catch((err) => {
        console.log(err.message)
    })
