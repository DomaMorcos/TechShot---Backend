const Member = require('../models/TeamMemberSchema')
const mongoose = require('mongoose')
// get all members
const getMembers = async(req,res) => {
    const members = await Member.find({}).sort({createdAt:-1})
    res.status(200).json(members)
}
// get a single member
const getMember = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const member = await Member.findById(id)

    if(!member) {
        return res.status(404).json({error:'No such member'})
    }
    res.status(200).json(member)
}
// ========================== Administrator Only ============================= //
// Add a new member
const createMember = async (req, res) => {
    const { name, gmail, linkedin, git, projects } = req.body;

    // Create an array of field names and their corresponding values
    const fields = { name, gmail, linkedin, git };

    // Filter out the field names where the value is empty (falsy)
    let emptyFields = Object.keys(fields).filter(field => !fields[field]);
    

    if (emptyFields.length > 0 && projects) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    // Continue with your logic if all fields are filled

    try {
        const member = await Member.create({name,gmail,linkedin,git,projects: projects || []})
        res.status(200).json(member)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}
// delete a Member
const deleteMember = async (req,res) => {
    const {id}=req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const member = await Member.findByIdAndDelete({_id:id})

    if(!member) {
        return res.status(400).json({error:'No such member'})
    }
    res.status(200).json(member)
}


// update a member

const updateMember = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const member = await Member.findByIdAndUpdate({_id:id},{
    ...req.body
    })
    if(!member) {
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(member)
}

module.exports = {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember
}