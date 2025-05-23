import jwt from 'jsonwebtoken'
import User from '../models/userMode.js'
import asyncHandler from './asyncHandler.js'


const authenticateUSer = asyncHandler(async (req, res, next) => {
    let token;

    //read the jwt form the jwt cookies 
    token = req.cookie.jwt;
    if (token) {
        try {
            //decode jwt
            const decoded = jwt. verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            next()

        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized, token failed")
        }
    } else {
        res.status(401)
        throw new Error("Not Authorized,no token")


    }


})