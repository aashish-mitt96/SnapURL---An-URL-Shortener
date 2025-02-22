import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true
    },
    visits: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],  
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true})

const urlModel = mongoose.model('Url', urlSchema)

export default urlModel