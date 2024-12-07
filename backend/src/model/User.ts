import mongoose from 'mongoose'

//  user schema
const userScheme = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    addressLine1: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    }
})

//  user model
const User = mongoose.model('User', userScheme)
export default User