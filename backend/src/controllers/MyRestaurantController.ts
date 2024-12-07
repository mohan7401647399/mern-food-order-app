import mongoose from 'mongoose';
import Restaurant from '../model/Restaurant';
import cloudinary from 'cloudinary';

//  get the existing restaurant controller
const getMyRestaurant = async (req: any, res: any) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId })
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })
        res.json(restaurant)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Error fetching restaurant" })
    }
}

//  create a new restaurant controlloer
const createMyRestaurant = async (req: any, res: any) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })
        if (existingRestaurant) return res.status(409).json({ message: "User Restaurant already exists" })

        const imageUrl = await uploadImage(req.file as Express.Multer.File)

        const restaurant = new Restaurant(req.body)
        restaurant.imageUrl = imageUrl
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date()

        await restaurant.save()

        res.status(201).send(restaurant)
        console.log(restaurant)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

//  update the existing restaurant controlloer
const updateMyRestaurant = async (req: any, res: any) => {
    try {
        const { restaurantName, city, country, deliveryPrice, estimatedDeliveryTime, cuisines, menuItems } = req.body
        const restaurant = await Restaurant.findOne({ user: req.userId })

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })

        restaurant.restaurantName = restaurantName
        restaurant.city = city
        restaurant.country = country
        restaurant.deliveryPrice = deliveryPrice
        restaurant.estimatedDeliveryTime = estimatedDeliveryTime
        restaurant.cuisines = cuisines
        restaurant.menuItems = menuItems
        restaurant.lastUpdated = new Date()

        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File)
            restaurant.imageUrl = imageUrl
        }

        await restaurant.save()

        res.status(200).send(restaurant)
        console.log(restaurant)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Error updating restaurant" })
    }
}

//  upload image
const uploadImage = async (file: Express.Multer.File) => {
    const image = file
    const base64Image = Buffer.from(file.buffer).toString('base64')
    const dataURI = `data:${file.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

    return uploadResponse.url
}

//  export
export default { getMyRestaurant, createMyRestaurant, updateMyRestaurant }