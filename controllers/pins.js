import Pin from "../models/pin.js";
import Comment from '../models/comment.js'
import Save from '../models/save.js'
import { deleteFromServer, saveNewImage, uploadImageToCloud } from "../utility/image.js";
import mongoose from "mongoose";


export const createPin = async (req, res, next) => {
    saveNewImage(req, res)
}

export const uploadImage = async (req, res, next) => {
    uploadImageToCloud(req.files, req, res)
}

export const deletePin = async (req, res, next) => {
    deleteFromServer(req, res, next)
}

export const getAllPins = async (req, res, next) => {
    const pins = await Pin.find({}).populate('save');
    res.status(200).send(pins)
}

export const addComments = async (req, res, next) => {
    const { comment, pinId, userId } = req.body
    const cmnt = await Comment.create({
        postedBy: userId,
        comment
    })

    const { comments } = await Pin.findById(pinId)

    comments.push(cmnt)

    await Pin.findByIdAndUpdate(
        pinId,
        {
            comments: comments
        }
    )

    res.status(200).json({
        success: true,
        message: "Comment added successfully"
    })
}


export const savePin = async (req, res, next) => {
    const { pinId, userId } = req.body

    const tempsave = await Save.create({
        savedBy: userId,
    })


    const { save } = await Pin.findById(pinId)


    save.push(tempsave)

    await Pin.findByIdAndUpdate(
        pinId,
        {
            save: save
        }
    )

    res.status(200).json({
        success: true,
        message: "Added to saved collection"
    })
}


export const getAllSaved = async (req, res, next) => {
    const saved = await Save.find({});

    res.status(200).json({
        success: true,
        saved: saved
    })
}

export const getPinDetail = async (req, res) => {
    const { id } = req.params
    const pin = await Pin.findById(id);

    res.status(200).json({
        success: true,
        pin: pin
    })
}

export const getComments = async (req, res, next) => {
    const { pinId } = req.params;

    try {
        const comments = await Pin.findById(pinId).select('comments').populate({
            path: 'comments',
            populate: {
                path: 'postedBy',
                select: 'name photo _id'
            }
        });

        res.status(200).json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getSimilarPins = async (req, res) => {
    const { category } = req.params

    try {
        const pins = await Pin.find({ category }).populate('save');

        res.status(200).json({
            success: true,
            pins
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const searchPin = async (req, res) => {
    const { keyword } = req.params
    try {
        const pins = await Pin.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { about: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
            ],
        }).populate('save')

        res.status(200).json({
            success: true,
            pins
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const getCreatedPins = async (req, res) => {
    const { id } = req.params
    try {
        const pins = await Pin.find({ postedBy: id }).populate('save');


        res.status(200).json({
            success: true,
            pins,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const getSavedPins = async (req, res) => {
    const { id } = req.params

    try {
        const pins = await Pin.find({}).populate('save')
        res.status(200).json({
            success: true,
            pins,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}