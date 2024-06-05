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


module.exports = router