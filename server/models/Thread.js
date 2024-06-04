const mongoose = require('mongoose')
const schema = mongoose.Schema

const ThreadSchema = new schema({
    title: String,
    createdAt: Date, 
    classId: mongoose.Types.ObjectId,
    content: String,
    userId: mongoose.Types.ObjectId,
    name: String
})

const Thread = mongoose.model('Thread', ThreadSchema)
module.exports = Thread