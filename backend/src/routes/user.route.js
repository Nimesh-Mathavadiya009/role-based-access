import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/check-auth").get(verifyJWT, (req,res) => {
   const user = req.user
   return res.status(200).json({
        success: true,
        messsage: 'Authenticated User!',
        user
    })
})

export default router

