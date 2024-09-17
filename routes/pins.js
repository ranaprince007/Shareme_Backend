import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addComments, createPin, getAllPins, savePin, deletePin, uploadImage, getAllSaved, getPinDetail, getComments,getSimilarPins, searchPin, getCreatedPins, getSavedPins } from "../controllers/pins.js";

const router = express.Router()

router.post('/createPin', isAuthenticated, createPin)
router.post('/uploadImage', isAuthenticated, uploadImage)
router.get('/getAllPins', isAuthenticated, getAllPins)
router.get('/getPinDetail/:id', isAuthenticated, getPinDetail)
router.put('/addComment', isAuthenticated, addComments)
router.get('/getComments/:pinId', isAuthenticated, getComments)
router.get('/getSimilarPins/:category', isAuthenticated, getSimilarPins)
router.put('/savePin', isAuthenticated, savePin)
router.get('/getAllSaved', isAuthenticated, getAllSaved)
router.delete('/delete', isAuthenticated, deletePin)
router.get('/searchPin/:keyword', isAuthenticated, searchPin)
router.get('/getCreatedPins/:id', isAuthenticated, getCreatedPins)
router.get('/getSavedPins/:id', isAuthenticated, getSavedPins)

export default router