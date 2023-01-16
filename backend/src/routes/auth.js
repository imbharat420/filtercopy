import {Router} from "express"
import asyncHandler from "express-async-handler"
import {loginController,registerController} from "../controller/authController.js"
const route = Router()

route.post("/login",loginController)

route.post("/register",registerController)


export default route;