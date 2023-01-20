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

        unique: true
    },
    address: {
        type: String,

        unique: true
    },
    password: {
        type: String,

    },
    cpassword: {
        type: String,

    },



}, { timestamp: true })
mongoose.models = {}
export default mongoose.model("User", UsersSchema)