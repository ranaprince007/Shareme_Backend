import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const isAuthenticated = async (req, res, next) => {
    // const { uid } = req.cookies;
    // console.log(uid)

    // if(!uid) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Login first"
    //     })
    // }

    // req.user = await User.findOne({ uid })

    next()
}