import {v2 as cloudinary} from 'cloudinary';
import Datauri from 'datauri/parser.js';
import path from 'path'
import Pin from '../models/pin.js';
import uuid4 from 'uuid4';
import Comment from '../models/comment.js';
import Save from '../models/save.js';

const dUri = new Datauri();

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});


export const saveNewImage = async (req, res) => {
    const {title, about, destination, category, image, imageId, userId, postedBy} = req.body;

      
      await Pin.create({
        title,
        about,
        destination,
        category,
        image,
        imageId,
        uid: userId,
        postedBy
    })

    res.status(201).json({
        success: true,
        message: "Successfully uploaded"
    })
}

export const uploadImageToCloud = async(files, req, res) => {
    const file = dUri.format(path.extname(files[0].originalname).toString(),files[0].buffer).content

    let photoAlbum = "empty"

    const uuid = uuid4()

    const promises = [file].map((img) => {
         return cloudinary.uploader.upload(
                  img,
                  {
                      resource_type: "image",
                      public_id: uuid,
                  }).then((result) => {
                      photoAlbum = result.url
                  }).catch((err) => {
                  });
      });
      
      await Promise.all(promises);

      res.json({
        success: true,
        message: "Image, Uploaded",
        url: photoAlbum,
        imageId: uuid
      })
}


export const deleteFromServer = async (req, res, next) => {
    const {_id} = req.body
    const  pin = await Pin.findById(_id)

    const promises = [1].map(() => {
      
        return cloudinary.uploader.destroy(
                 pin.imageId).then((result) => {
                     console.log("deleted")
                 }).catch((err) => {
                    console.log(err)
                 });
     });
     
     await Promise.all(promises); 

     const {save, comments} = pin;

     if(save.length > 0) {
        await Save.deleteMany({ _id : { $in: save }});
     }

     if(comments.length > 0) {
        await  Comment.deleteMany({ _id: { $in: comments }});
     }
    
     await Pin.findByIdAndDelete(_id)

     res.status(204).json({
        success: true,
        message: "Successfully deleted"
     })
}

