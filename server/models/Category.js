const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const CategorySchema = new schema({
    title: String,
    author: String,
    createdAt: Date
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category