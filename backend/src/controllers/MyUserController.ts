import User from "../model/User";

//  get user
const getCurrentUser = async (req: any, res: any) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId })
        if (!currentUser) return res.status(404).json({ message: "User Not Found" })
        res.json(currentUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

//  create a new user
const createCurrentUser = async (req: any, res: any) => {
    try {
        const { auth0Id } = req.body
        const existingUser = await User.findOne({ auth0Id })

        if (existingUser) return res.status(200).send()

        const newUser = new User(req.body)
        await newUser.save()

        res.status(201).json(newUser.toObject())

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error Creating User" })
    }
}

//  update the existing user
const updateCurrentUser = async (req: any, res: any) => {
    try {
        const { name, addressLine1, city, country } = req.body
        const user = await User.findById(req.userId)

        if (!user) return res.status(404).json({ message: "User Not Found" })

        user.name = name
        user.addressLine1 = addressLine1
        user.city = city
        user.country = country

        await user.save()

        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error Updating User" })
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
}