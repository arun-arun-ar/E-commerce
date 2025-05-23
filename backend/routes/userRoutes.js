import express from "express"
import { createUser, loginUser, logoutUser } from '../controllers/userController.js';

//creating a router using express 
const router = express.Router();


router.route('/').post(createUser)
router.route('/auth').post(loginUser)
router.route('/logout').post(logoutUser)




//export our routes
export default router;
