import cookieParser from 'cookie-parser';
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const userLogin = async (req, res, next) => {
    const { uid, name, photo } = req.body
    
    const encodedId = jwt.sign(uid, process.env.JWT_SECRET_KEY)

    let user = await User.findOne({ uid:encodedId });



    if (!user) {
        user = await User.create({
            uid:encodedId, name, photo
        })


        return res.status(201).cookie("uid", encodedId, {
            maxAge: 24 * 60 * 60 * 60 * 1000,
            httpOnly: true
        }).json(({
            success: true,
            message: "Registered Successfully"
        }))
    }
    res.status(200).cookie("uid", encodedId, {
        maxAge: 15*60*1000,
        httpOnly: true,
    }).json({
        success: true,
        message: `Hi, ${user.name}. Welcome back`,
        userInfo: user
    })
}

export const userLogout = (req, res, next) => {
    res.cookie("uid", "", {
        expire: new Date(Date.now())
    }).json({
        success: true,
        message: "Logout successfully"
    })
}

export const getUserInfo = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        userInfo: user
    });
}