const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,

        unique: true
    },
    phone: {
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""

    },
    password: {
        type: String,

    },
    cpassword: {
        type: String,

    },
    messages: [{
        email: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }

    }]



}, { timestamp: true })
mongoose.models = {}
export default mongoose.model("User", UsersSchema)