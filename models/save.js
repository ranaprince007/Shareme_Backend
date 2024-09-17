import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

const Save = mongoose.model('Save', saveSchema);

export default Save;