require('dotenv').config()
const nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()

function sendEmail({firstName, lastName, email, phoneNumber, message }){
        return new Promise((resolve,reject)=>{
            const transporter = nodemailer.createTransport({
                service:"gmail",
                port:465,
                secure:true,
                auth:{
                    user: process.env.EMAIL_USER, // your email
                    pass: process.env.EMAIL_PASS, // your app password
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
    


        const info = {
            from: email, // Sender's email address from the form
            to: process.env.EMAIL_USER, // Your receiving email address
            subject: `Contact Us Form Submission from ${firstName} ${lastName}`,
            text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Phone Number: ${phoneNumber}
                Message: ${message}
                `
        }
        transporter.sendMail(info,function(error,info){
            if(error){
                console.log(error);
                return reject({message:'An error occured'})

            }
            return resolve({message:"Email sent successfully"})

        })
    })
            
            
    }

    router.post("/", (req, res) => {
        const { firstName, lastName, email, phoneNumber, message } = req.body;
    
        // Ensure all required fields are provided
        if (!firstName || !lastName || !email || !phoneNumber || !message) {
            return res.status(400).send('All fields are required');
        }
    
        sendEmail({ firstName, lastName, email, phoneNumber, message })
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message));
    });
    
module.exports = router