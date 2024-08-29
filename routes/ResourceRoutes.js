const express = require('express')
const {
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
} = require('../controllers/ResourceControllers')

const router = express.Router()

router.get('/' ,getResources)

router.get('/:id' ,getResource)

router.post('/' ,createResource)

router.delete('/:id' ,deleteResource)

router.patch('/:id' ,updateResource)

module.exports = router