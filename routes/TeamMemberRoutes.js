const express = require('express')
const {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    getMemberByName
} = require('../controllers/TeamMemberControllers')

const router = express.Router()

router.get('/' ,getMembers)

router.get('/id/:id' ,getMember)

router.get('/name/:name' ,getMemberByName)

router.post('/' ,createMember)

router.delete('/:id' ,deleteMember)

router.patch('/:id' ,updateMember)

module.exports = router