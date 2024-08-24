const express = require('express')
const {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember
} = require('../controllers/TeamMemberControllers')

const router = express.Router()

router.get('/' ,getMembers)

router.get('/:id' ,getMember)

router.post('/' ,createMember)

router.delete('/:id' ,deleteMember)

router.patch('/:id' ,updateMember)

module.exports = router