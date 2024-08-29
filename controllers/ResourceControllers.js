const Resource =  require('../models/ResourceSchema')
const mongoose = require('mongoose')

const getResources = async(req,res) => {
    const resource = await Resource.find({}).sort({createdAt:-1})
    res.status(200).json(resource)
}

// get a resource
const getResource = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const resource = await Resource.findById(id)

    if(!resource) {
        return res.status(404).json({error:'No such resource'})
    }
    res.status(200).json(resource)
}

// Add a new resource
const createResource = async (req, res) => {
    const { imgPath, paragraph , link } = req.body;

    // Check for empty fields in the image path, paragraph and link
    let emptyFields = [];
    if (!imgPath) {
        emptyFields.push('imgPath');
    }
    if (!paragraph) {
        emptyFields.push('paragraph');
    } 
    if (!link){
        emptyFields.push('link');
    }

    // Return an error response if there are any empty fields
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields });
    }
    // Continue with your logic if all fields are filled
    try {
        const resource = await Resource.create({ imgPath, paragraph , link  });
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a Resource
const deleteResource = async (req,res) => {
    const {id}=req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const resource = await Resource.findByIdAndDelete({_id:id})

    if(!resource) {
        return res.status(400).json({error:'No such resource'})
    }
    res.status(200).json(Resource)
}

// update a Resource
const updateResource = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }
    const resource = await Resource.findByIdAndUpdate({_id:id},{
    ...req.body
    })
    if(!resource) {
        return res.status(400).json({error:'No such resource'})
    }
    res.status(200).json(resource)
}

module.exports = {
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
}