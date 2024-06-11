const express = require('express')
const router = express.Router()
const Thread = require('../models/Thread')
const Post = require('../models/Post')
const mongoose = require('mongoose')
const Class = require('../models/Class')

router.post('/create', async (req, res) => {
    console.log(Date.now().toLocaleString())
    const newThread = Thread({
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now(),
        classId: req.body.classId,
        userId: req.body.userId,
        name: req.body.name
    })

    await newThread.save()
    res.send(newThread)
})

router.get('/:id', async (req, res) => {
    console.log("Thread id: " + req.params.id)
    const thread = await Thread.findById((req.params.id))
    if (!thread || thread === 'null') {
        res.status(404).send({
            message: 'Thread not found'
        })
        return
    }

    res.send(thread)
})

router.get('/class/:id', async (req, res) => {
    const Threads = await Thread.find({ classId: req.params.id })
    res.send(Threads)
})

router.delete('/delete/:id', async (req, res) => {
    const postResponse = await Post.deleteMany({threadId: req.params.id}).then(async (result) => {
        const thrResponse = await Thread.findByIdAndDelete(req.params.id)
    })
    res.status(200).send({
        message: `Deleted thread ${req.params.id} and its child posts`
    })
})

router.patch('/:id', async (req, res) => {
    const updateObject = req.body
    const id = req.params.id

    const obj = await Thread.findById(id)
    console.log(obj.title)
    const find = await Thread.findByIdAndUpdate(id, updateObject)
    res.sendStatus(200)

})


module.exports = router