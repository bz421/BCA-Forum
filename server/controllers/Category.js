const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const mongoose = require('mongoose')

router.post('/create', async (req, res) => {
    // console.log('req: ' + req)
    const newCategory = Category({
        title: req.body.title,
        createdAt: Date.now(),
        author: req.body.name
    })

    await newCategory.save()
    res.send(newCategory)
})

router.get('/:id', async (req, res) => {
    console.log("post id: " + req.params.id)
    const cat = await Category.findById((req.params.id))
    if (!cat || cat === 'null') {
        res.status(404).send({
            message: 'Category not found'
        })
        return
    }

    res.send(cat)
})

router.get('/', async (req, res) => {
    const cats = await Category.find({})
    res.send(cats)
})


module.exports = router