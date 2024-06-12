const mongoose = require('mongoose')
const schema = mongoose.Schema

const PostSchema = new schema({
    createdAt: Date, 
    threadId: mongoose.Types.ObjectId,
    content: String,
    userId: mongoose.Types.ObjectId,
    name: String
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post