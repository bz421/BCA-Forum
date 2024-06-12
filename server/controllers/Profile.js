const express = require('express')
const router = express.Router()
const Thread = require('../models/Thread')
const Post = require('../models/Post')
const mongoose = require('mongoose')

router.get('/:id', async (req, res) => {
    // console.log("post id: " + req.params.id)
    const thr = await Thread.find({ userId: `${new mongoose.Types.ObjectId(req.params.id)}`})
    const post = await Post.find({ userId: `${new mongoose.Types.ObjectId(req.params.id)}`})
    if (!thr || thr === 'null') {
        res.status(404).send({
            message: 'Thread not found'
        })
        return
    }
    if (!post || post === 'null') {
        res.status(404).send({
            message: 'Post not found'
        })
        return
    }

    res.json({threads : thr, posts : post})

    
})



module.exports = router