import express from "express";
import { userLogin, userLogout, getUserInfo} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const  router = express.Router()


router.post("/login", userLogin)
router.post("/logout", userLogout)
router.get("/getUserInfo/:id", isAuthenticated, getUserInfo)


export default router