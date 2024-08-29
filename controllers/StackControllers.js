const Stack =  require('../models/StackSchema')
const mongoose = require('mongoose')

const getStack = async(req,res) => {
    const stack = await Stack.find({}).sort({createdAt:-1})
    res.status(200).json(stack)
}

// get an image
const getImage = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const image = await Stack.findById(id)

    if(!image) {
        return res.status(404).json({error:'No such image'})
    }
    res.status(200).json(image)
}

// Add a new image
const createImage = async (req, res) => {
    const { name , imgPath} = req.body;

    // Check for empty fields in the image name and path
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!imgPath) {
        emptyFields.push('imgPath');
    } 

    // Return an error response if there are any empty fields
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields });
    }
    // Continue with your logic if all fields are filled
    try {
        const image = await Stack.create({ name, imgPath});
        res.status(200).json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete an image
const deleteImage = async (req,res) => {
    const {id}=req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const image = await Stack.findByIdAndDelete({_id:id})

    if(!image) {
        return res.status(400).json({error:'No such image'})
    }
    res.status(200).json(Stack)
}

// update an image
const updateImage = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }
    const image = await Stack.findByIdAndUpdate({_id:id},{
    ...req.body
    })
    if(!image) {
        return res.status(400).json({error:'No such image'})
    }
    res.status(200).json(image)
}

module.exports = {
    getStack,
    getImage,
    createImage,
    updateImage,
    deleteImage
}