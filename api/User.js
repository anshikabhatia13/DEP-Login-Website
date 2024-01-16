const express = require("express");
const router = express.Router();
//mongoDB user model
const User = require("./../models/User");

const UserVerification = require("./../models/UserVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

//password handler
const bcrypt = require("bcrypt");

const path = require("path");

const { error } = require("console");


const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "dep.p03.2024@gmail.com",
        pass: "xsmtpsib-6b29f1272c05632003314cbce5f6cb6cfc5195cebc247e569f129c3a64beafd9-zDhHMgZ9jwLxKGBA",
    },
});

// const mailOptions = {
//     from: 'dep.p03.2024@gmail.com',
//     to: 'asadalam1021@gmail.com',
//     subject: `verification email`,
//     text: `Here is the otp to verify your account`
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

// let transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth: {
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS,
//     }
// })

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});
// check start



router.post("/signup", async (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name === "" || email === "" || password === "" || dateOfBirth === "") {
        res.json({
            status: "FAILED",
            message: "Empty input field",
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered",
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered",
        });
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered",
        });
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short",
        });
    } else {
        // Generate OTP
        const otp = generateOTP();

        // Hash the OTP before storing it in the database
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp.toString(), saltRounds);

        // Store the hashed OTP in the user model
        const newUser = new User({
            name,
            email,
            password: hashedOtp, // Storing hashed OTP for verification
            dateOfBirth,
            verified: false,
        });

        newUser
            .save()
            .then((result) => {
                sendVerificationEmail(result, otp, res);
                res.json({
                    status: "SUCCESS",
                    message: "SignUp Successful! Check your email for OTP.",
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                });
            });
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
 
const sendVerificationEmail = ({ _id, email }, otp, res) => {
    const currentUrl = "http://localhost:5000/";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p>
                <p>This link <b>expires in 6 hours</b>.</p>
                <p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>
                <p>Your OTP: ${otp}</p>`,
};

    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set values in userverification collection
            const newVerification = new UserVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000,
            });

            newVerification      
                .save()
                .then(() =>{
                    transporter.sendMail(mailOptions).then( ()=>{
                        res.json({
                            status: "PENDING",
                            message: "Verification email sent!",
                        });
                        
                    })
                    .catch((error) =>{
                        console.log(error);
                        res.json({
                            status: "FAILED",
                            message: "Verification email failed!",
                        });

                    })
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "Couldn't save verification email data!",
                    });
                })
        })
                .catch (() => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing email data!",
            });
        })
    };


    router.get("/verify/:userId/:uniqueString", (req, res) => {
        let { userId, uniqueString } = req.params;
    
        UserVerification.find({ userId })
            .then((result) => {
                if (result.length > 0) {
                    const { expiresAt, uniqueString: hashedUniqueString } = result[0];
    
                    if (expiresAt< Date.now()){
                        UserVerification
                        .deleteOne({userId})
                        .then( result => {
                            User.deleteOne({_id: userId})
                            .then( () => {
                                let message = "Link has expired. Please sign up again!";
                                res.redirect(`/user/verified/error=true&message=${message}`);

                            })
                            .catch(error => {
                                let message = "Clearing user with expired unique string failed!";
                                res.redirect(`/user/verified/error=true&message=${message}`);

                            })
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occured while clearing expired user verification record!";
                            res.redirect(`/user/verified/error=true&message=${message}`);

                        })
                    } else{
                        bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {
                                User
                                .updateOne({_id: userId}, {verified: true})
                                .then(() => {
                                    UserVerification.deleteOne({userId})
                                    .then(() =>{
                                        res.sendFile(path.join(__dirname, "./../views/verified.html"));
                                    })
                                    .catch()
                                })
                                .catch(error =>{
                                    console.log(error);
                                    let message = "An error occured while updating user record to show verified";
                                    res.redirect(`/user/verified/error=true&message=${message}`);

                                    
                                })
                            } else {
                                let message = "Invalid verificaton detais passed. Check your inbox!";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            }
                        })
                        .catch(error => {
                            let message = "An error occured while comparing unique string!";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })

                    }

            }
        else {
            let message = "Account record doesn't exist or has been verified already. Please sign up or login!";
            res.redirect(`/user/verified/error=true&message=${message}`);

        }
    }) 
    .catch((error) => {
        console.log(error);
        let message = "An error occurred while checking for existing user verification record!";
        res.redirect(`/user/verified/error=true&message=${message}`);
    });
});

router.get("/verified", (req, res) =>{
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
})


router.post("/verify-otp/:userId", async (req, res) => {
    const { userId } = req.params;
    const { otp } = req.body;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
        return res.json({
            status: "FAILED",
            message: "User not found",
        });
    }

    // Compare the provided OTP with the stored hashed OTP
    const result = await bcrypt.compare(otp.toString(), user.password);

    if (result) {
        // OTP is valid, update user as verified
        await User.updateOne({ _id: userId }, { verified: true });

        res.json({
            status: "SUCCESS",
            message: "Account verified successfully!",
        });
    } else {
        res.json({
            status: "FAILED",
            message: "Invalid OTP",
        });
    }
});

router.post("/signin", (req, res) => {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied",
        });
    } else {
        User.find({ email })
            .then((data) => { 

                if (data.length) {

                    if(!data[0].verified){
                        res.json({
                            status: "FAILED",
                            message: "Email has not been verified yet. check inbox!",
                        });
                    } else{
                        const hashedPassword = data[0].password;
                        bcrypt
                            .compare(password, hashedPassword)
                            .then((result) => {
                                if (result) {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "SignIn Successful",
                                        data: data,
                                    });
                                } else {
                                    res.json({
                                        status: "FAILED",
                                        message: "Invalid password entered!",
                                    });
                                }
                            })
                            .catch((err) => {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occured while comparing passwords",
                                });
                            });
                    }


                    
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid Credentials entered!",
                    });
                }
            })
            .catch((err) => {
                res.json({
                    status: "FAILED",
                    message: "An error occured while checking for existing user",
                });
            });
    }
});
module.exports = router;
