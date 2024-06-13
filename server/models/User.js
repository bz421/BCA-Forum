const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const UserSchema = new schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date,
    heartedClasses: [mongoose.Types.ObjectId]
})

UserSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('password')) return next()
    
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User