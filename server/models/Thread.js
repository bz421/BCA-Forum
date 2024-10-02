const mongoose = require('mongoose')
const schema = mongoose.Schema


// thread.name shows last edited person, add new field to Thread for last editor
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