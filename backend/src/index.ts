import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import myUserRoute from './routes/MyUserRoutes'
import myRestaurantRoute from './routes/MyRestaurantRoute'
import { v2 as cloudinary } from 'cloudinary'

//  mongodb connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log('mongodb connected')).catch((err) => console.log(err))

//  cloundinary for images
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//  express config
const app = express()
app.use(express.json())
app.use(cors())

//  user route
app.use('/api/my/user', myUserRoute)
app.use('/api/my/restaurant', myRestaurantRoute)

// backend server
app.listen(7000, () => {
    console.log('Server Started localhost on - 7000')
})  