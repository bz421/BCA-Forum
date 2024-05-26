const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const CategorySchema = new schema({
    title: String,
    author: String,
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


const Category = mongoose.model('Category', CategorySchema)
module.exports = Category