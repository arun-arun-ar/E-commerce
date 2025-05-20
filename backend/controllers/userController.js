import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "../middlewares/asyncHandler.js";


//fucntion to create a user
const createUser = asyncHandler(async (req, res) => {
    //get data form front end
    const { username, email, password } = req.body;

    //data validatinn
    if (!username || !email || !password) {
        throw new Error(" All the fields are requireds, Please filed all the inputs")

    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400).json({message: "Emaile is alredy been used"})
    }

    //hash our passowd using bcryptjs
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating a new user
    const newUser = new User({username, email, password: hashedPassword})

    //error handlaing while savign a new user
    try {
        //save the new user
        await newUser.save()

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        //throw error if something went worong while creating a new user
        res.status(400)
        throw new Error("invlid user data")
    }
    
});


export { createUser };