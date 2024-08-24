const Project = require('../models/ProjectSchema')

const mongoose = require('mongoose')

const getProjects = async(req,res) => {
    const projects = await Project.find({}).sort({createdAt:-1})
    res.status(200).json(projects)
}
// get a single member
const getProject = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({error:'No such project'})
    }
    res.status(200).json(project)
}
// ========================== Administrator Only ============================= //
// Add a new project
const createProject = async (req, res) => {
    const { name, details } = req.body;

    // Check for empty fields in the name and details
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!details || details.length === 0) {
        emptyFields.push('details');
    } else {
        details.forEach((detail, index) => {
            if (!detail.imgPath) {
                emptyFields.push(`details[${index}].imgPath`);
            }
            if (!detail.descriptionParagraph) {
                emptyFields.push(`details[${index}].descriptionParagraph`);
            }
            if (!detail.membersID || detail.membersID.length === 0) {
                emptyFields.push(`details[${index}].membersID`);
            } else {
                detail.membersID.forEach((id, idIndex) => {
                    if (!id) {
                        emptyFields.push(`details[${index}].membersID[${idIndex}]`);
                    }
                });
            }
        });
    }

    // Return an error response if there are any empty fields
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields });
    }

    // Continue with your logic if all fields are filled
    try {
        const project = await Project.create({ name, details });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a Project
const deleteProject = async (req,res) => {
    const {id}=req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const member = await Project.findByIdAndDelete({_id:id})

    if(!project) {
        return res.status(400).json({error:'No such Project'})
    }
    res.status(200).json(Project)
}


// update a Project

const updateProject = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const project = await Project.findByIdAndUpdate({_id:id},{
    ...req.body
    })
    if(!member) {
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(project)
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}