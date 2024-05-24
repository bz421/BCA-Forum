const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const UserSchema = new schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date
})

// UserSchema.pre('save', async function(next){
//     const user = this
//     if (!user.isModified('password')) return next()

//     bcrypt.genSalt(10, function(err, salt){
//         if (err) return next(err)

//         bcrypt.hash(user.password, salt, function(err, hash){
//             if (err) return next(err)

//             user.password = hash
//             next()
//         })
//     })
    
//     }
// )

UserSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('password')) return next()
    
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User