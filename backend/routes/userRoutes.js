import express from "express"
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

//creating a router using express 
const router = express.Router();


router
    .route("/")
    .post(createUser)
    .get(authenticate, authorizeAdmin, )


router.route('/auth').post(loginUser)
router.route('/logout').post(logoutCurrentUser)
router.route('/get-all-users').get(getAllUsers)

router.route('/profile').get(authenticate, getCurrentUserProfile)




//export our routes
export default router;
