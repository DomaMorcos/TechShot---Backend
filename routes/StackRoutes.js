const express = require('express')
const {
    getStack,
    getImage,
    createImage,
    updateImage,
    deleteImage
} = require('../controllers/StackControllers')

const router = express.Router()

router.get('/' ,getStack)

router.get('/:id' ,getImage)

router.post('/' ,createImage)

router.delete('/:id' ,deleteImage)

router.patch('/:id' ,updateImage)

module.exports = router