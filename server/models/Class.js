const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const ClassSchema = new schema({
    title: String,
    author: String,
    createdAt: Date, 
    categoryId: mongoose.Types.ObjectId
})

const Class = mongoose.model('Class', ClassSchema)
module.exports = Class