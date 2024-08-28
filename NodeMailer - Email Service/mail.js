require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const dns = require('dns');

function isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isEmailDomainValid(email) {
    return new Promise((resolve, reject) => {
        const domain = email.split('@')[1];

        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                return resolve(false); // Domain is not valid for email receiving
            }
            return resolve(true); // Domain is valid
        });
    });
}

async function validateEmail(email) {
    if (!isValidEmailFormat(email)) {
        return { isValid: false, message: 'Invalid email format' };
    }

    const isDomainValid = await isEmailDomainValid(email);
    if (!isDomainValid) {
        return { isValid: false, message: 'Email domain is not valid' };
    }

    return { isValid: true, message: 'Email is valid' };
}



function sendEmail({ firstName, lastName, email, phoneNumber, message }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // your app password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailToSelf = {
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
        };

        const mailToUser = {
            from: process.env.EMAIL_USER, // Your email
            to: email, // User's email address from the form
            subject: 'Confirmation: We have received your message',
            text: `Dear ${firstName},\n\nThank you for reaching out to us! We have received your message and will get back to you as soon as possible.\n\nBest regards,\nTechShot`,
        };

        // Send email to your email address
        transporter.sendMail(mailToSelf, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: 'An error occurred while sending email to admin' });
            }

            // Send confirmation email to user
            transporter.sendMail(mailToUser, (error, info) => {
                if (error) {
                    console.log(error);
                    return reject({ message: 'An error occurred while sending confirmation email to user' });
                }

                return resolve({ message: "Email sent successfully and confirmation email sent to user" });
            });
        });
    });
}

router.post("/",async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    // Ensure all required fields are provided
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
        return res.status(400).send('All fields are required');
    }

    const emailValidationResult = await validateEmail(email);
    if (!emailValidationResult.isValid) {
        return res.status(400).send(emailValidationResult.message);
    }


    sendEmail({ firstName, lastName, email, phoneNumber, message })
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});

module.exports = router;
