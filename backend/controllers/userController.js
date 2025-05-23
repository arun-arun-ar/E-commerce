import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";


//fucntion to create a user
const createUser = asyncHandler(async (req, res) => {
    //get data form front end
    const { username, email, password } = req.body;

    //data validatinn
    if (!username || !email || !password) {
        throw new Error(" All the fields are requireds, Please filed all the inputs")

    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: "Emaile is alredy been used" })
    }

    //hash our passowd using bcryptjs
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating a new user
    const newUser = new User({ username, email, password: hashedPassword })

    //error handlaing while savign a new user
    try {
        //save the new user
        await newUser.save()

        generateToken(res, newUser._id)

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


// Function to login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("Both fields are required. Please enter both email and password.");
    }

    // Find user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

    // Generate token and send response
    generateToken(res, existingUser._id);

    res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
    });
});


//logout user 
const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: "User Logout Succesfully"})

})


export { createUser, loginUser, logoutUser };