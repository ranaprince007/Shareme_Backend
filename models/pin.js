import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    destination: String,
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    uid:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    save: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Save'
    }]

});

const Pin = mongoose.model('Pin', pinSchema);

export default Pin;
