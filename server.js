//dot env file
require('dotenv').config()
// importing express
const express = require('express')
//importing cors 
const cors =require('cors')
const app = express()
const port = process.env.PORT || 4000
//importing mongoose
const mongoose = require('mongoose')
//importing routes
const TeamMemberRoutes = require('./routes/TeamMemberRoutes')
const ProjectRoutes = require('./routes/ProjectsRoutes')
const Email = require('./NodeMailer - Email Service/mail')

//middleware
app.use(cors())
app.use(express.json())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(req.path,req.method)
    next()
})
//routes
app.use('/api/v1/members',TeamMemberRoutes)
app.use('/api/v1/projects',ProjectRoutes)
app.use('/api/v1/sendEmail',Email)

const start = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Optionally add other connection options here
        });

        // Listen for requests
        app.listen(port, () => {
            console.log(`Connected to DB & listening on port ${port}...`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit process with failure code
    }
};
start()