require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
const TeamMemberRoutes = require('./routes/TeamMemberRoutes')
const ProjectRoutes = require('./routes/ProjectsRoutes')

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

app.use('/api/v1/members',TeamMemberRoutes)
app.use('/api/v1/projects',ProjectRoutes)

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