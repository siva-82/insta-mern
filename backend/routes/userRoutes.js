import express from 'express'
import { authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers
 } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'    
const router =express.Router()

router.post('/',registerUser)
router.post('/auth',authUser)
router.get('/getUsers',getUsers)
router.post('/logout',logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
 
export default router