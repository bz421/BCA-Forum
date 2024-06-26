const express = require('express')
const router = express.Router()
const Class = require('../models/Class')
const User = require('../models/User')
const mongoose = require('mongoose')

router.post('/create', async (req, res) => {
    // const {title, name, categoryId} = req.body
    // console.log('req: ' + req)
    const newClass = Class({
        title: req.body.title,
        createdAt: Date.now(),
        author: req.body.name,
        categoryId: req.body.categoryId
    })

    await newClass.save()
    res.send(newClass)
})  

router.patch('/:id', async (req, res) => {
    const updateObject = req.body
    const id = req.params.id

    const find = await Class.findByIdAndUpdate(id, updateObject)
    res.sendStatus(200)

})

router.get('/:id', async (req, res) => {
    console.log("class id: " + req.params.id)
    const cLass = await Class.findById((req.params.id))
    if (!cLass || cLass === 'null') {
        res.status(404).send({
            message: 'Class not found'
        })
        return
    }

    res.send(cLass)
})

router.get('/category/:id', async (req, res) => {
    const cLasses = await Class.find({categoryId: req.params.id})
    res.send(cLasses)
})


module.exports = router