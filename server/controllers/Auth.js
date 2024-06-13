const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

router.get('/init', async (req, res) => {
    let response = null

    if (req.query.token) {
        const { userId } = jwt.verify(req.query.token, 'app')
        const user = await User.findById(userId)
        if (user) {
            response = user
        }
    }
    res.send({ user: response })
})

router.post('/register', async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
        res.status(400).send({
            message: 'email_exists'
        })
        return
    }

    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
    })

    await newUser.save()
    res.sendStatus(201)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(404).send({
            message: 'user_not_found'
        })
        return
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password)
    if (!isEqual) {
        res.status(401).send({
            message: 'wrong_password'
        })
        return
    }

    const token = jwt.sign({ userId: user._id }, 'app')
    res.send({
        token,
        user
    })
})

router.patch('/changeheart/:id', async (req, res) => {
    const updateObject = req.body.heartedClasses
    console.log(updateObject)
    console.log(typeof(updateObject))
    for (let i=0; i<updateObject.length; i++) {
        console.log('Null checking: ' + !updateObject[i])
        updateObject[i] = (new mongoose.Types.ObjectId(updateObject[i]))
        console.log('Here! ' + updateObject[i])
    }
    // req.params.id: user id
    // req.body.classId: classId
    // const user = await User.findById(req.body.user)
    console.log('Final! ' + updateObject)
    const response = await User.findByIdAndUpdate(req.params.id, {
        heartedClasses: updateObject
    })
    res.sendStatus(200)

})
// router.patch('/unheart/:id', async (req, res) => {
//     const updateObject = req.body.heartedClasses
//     console.log(updateObject)
//     console.log(typeof (updateObject))
//     for (let i = 0; i < updateObject.length; i++) {
//         updateObject[i] = (new mongoose.Types.ObjectId(updateObject[i].cid))
//         console.log('Here! ' + JSON.stringify(updateObject[i]))
//     }
//     // req.params.id: user id
//     // req.body.classId: classId
//     // const user = await User.findById(req.body.user)
//     const response = await User.findByIdAndUpdate(req.params.id, req.body)
//     res.sendStatus(200)
// })

module.exports = router