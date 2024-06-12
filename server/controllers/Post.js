const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const mongoose = require('mongoose')

router.post('/create', async (req, res) => {
    const newPost = Post({
        content: req.body.content,
        createdAt: Date.now(),
        threadId: req.body.threadId,
        userId: req.body.userId,
        name: req.body.name
    })

    await newPost.save()
    res.send(newPost)
})  


router.get('/thread/:id', async (req, res) => {
    const page = req.query.page
    const PER_PAGE = 10
    const Posts = await Post.find({threadId: req.params.id}).limit(PER_PAGE).skip(PER_PAGE * (page-1))
    res.send(Posts)
})

router.delete('/delete/:id/', async (req, res) => {
    const response = await Post.findByIdAndDelete(req.params.id)
    res.status(200).send({
        message: `Deleted post ${req.params.id}`
    })
})

router.patch('/:id', async (req, res) => {
    const updateObject = req.body
    const id = req.params.id

    const find = await Post.findByIdAndUpdate(id, updateObject)
    res.sendStatus(200)

})


module.exports = router