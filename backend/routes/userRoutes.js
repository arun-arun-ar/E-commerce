import express from "express"
import { createUser } from '../controllers/userController.js';

//creating a router using express 
const router = express.Router();


router.route('/').post(createUser)



//export our routes
export default router;
