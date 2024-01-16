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

//path for static verified page
const path = require("path");

const { error } = require("console");


const { createTransport } = require('nodemailer');

const transporter = createTransport({ //it will carry the email 
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


// router.post("/signup", async (req, res) => {//this will handle all post requests to the signup path
//     let { name, email, password, dateOfBirth } = req.body; //this is the body of the incoming request from the client
//     name = name.trim();
//     email = email.trim();
//     password = password.trim();
//     dateOfBirth = dateOfBirth.trim();

//     // Check if email is already registered
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//         // Check if the existing user is already verified
//         if (existingUser.verified) {
//             res.json({
//                 status: "FAILED",
//                 message: "Email is already registered and verified.",
//             });
//         } else {
//             res.json({
//                 status: "FAILED",
//                 message: "Email is already registered but not verified. Check inbox!",
//             });
//         }
//     }
//     else if (name === "" || email === "" || password === "" || dateOfBirth === "") {
//         res.json({
//             status: "FAILED",
//             message: "Empty input field",
//         });
//     } else if (!/^[a-zA-Z ]*$/.test(name)) {
//         res.json({
//             status: "FAILED",
//             message: "Invalid name entered",
//         });
//     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//         res.json({
//             status: "FAILED",
//             message: "Invalid email entered",
//         });
//     } else if (!new Date(dateOfBirth).getTime()) {
//         res.json({
//             status: "FAILED",
//             message: "Invalid date of birth entered",
//         });
//     } else if (password.length < 8) {
//         res.json({
//             status: "FAILED",
//             message: "Password is too short",
//         });
//     } else {
//         // Generate OTP
//         const otp = generateOTP();

//         // Hash the OTP before storing it in the database
//         const saltRounds = 10;
//         const hashedOtp = await bcrypt.hash(otp.toString(), saltRounds);

//         // Store the hashed OTP in the user model
//         const newUser = new User({
//             name,
//             email,
//             password: hashedOtp, // Storing hashed OTP for verification
//             dateOfBirth,
//             verified: false,
//         });

//         newUser
//             .save()
//             .then((result) => {
//                 //handle email verification
//                 sendVerificationEmail(result, otp, res);
//                 // res.json({
//                 //     status: "SUCCESS",
//                 //     message: "SignUp Successful! Check your email for OTP.",
//                 //     data: result,
//                 // });
//             })
//             .catch((err) => {
//                 res.json({
//                     status: "FAILED",
//                     message: "An error occurred while saving user account!",
//                 });
//             });
//     }
// });//original function

router.post("/signup", async (req, res) => {
    let { name, email, phone,address } = req.body;
    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    address = address.trim();
    // Check if email is already registered

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        // Check if the existing user is already verified
        if (existingUser.verified) {
            res.json({
                status: "FAILED",
                message: "Email is already registered and verified.",
            });
        } else {
            res.json({
                status: "FAILED",
                message: "Email is already registered but not verified. Check inbox!",
            });
        }
    } else if (name === "" || email === "") {
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
    }
    // else if (!new Date(dateOfBirth).getTime()) {
    //     res.json({
    //         status: "FAILED",
    //         message: "Invalid date of birth entered",
    //     });
    // } 
    else {
        // Generate OTP
        const otp = generateOTP();

        // Store the OTP in the user model
        const newUser = new User({
            name,
            email,
            otp: otp.toString(), // Storing hashed OTP for verification
            address,
            phone,
            // verified: false,
        });

        newUser
            .save()
            .then((result) => {
                // Handle email verification
                sendVerificationEmail(result, otp, res);
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

//send verification email function
const sendVerificationEmail = ({ _id, email }, otp, res) => {
    //id is generated by mongoDB
    //url to be used in the email
    const currentUrl = "http://localhost:5000/";
    const uniqueString = uuidv4() + _id;
    //mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p>
//             <p>This link <b>expires in 6 hours</b>.</p>
//             <p>Enter this OTP: <strong>${otp}</strong> on the verification page.</p>`,
};


    //hash the unique string into uservarification collection
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set values in userverification collection
            const newVerification = new UserVerification({ //create a new userverification record
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000,
                //added 6 hours to the current time in milliseconds
            });
    
            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            //email sent and userverification record saved
                            res.json({
                                status: "PENDING",      //still pending
                                message: "Verification email sent!",
                            });

                        })
                        .catch((error) => {
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
        .catch(() => {
            //first error to be handled
            res.json({
                status: "FAILED",
                message: "An error occurred while hashing email data!",
            });
        })
};

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
})

router.post("/verify-otp", async (req, res) => {
    try {
        let { uid, otp } = req.body;
        // uid is email over here
        console.log('Received data verify-otp:', uid, otp); // received from frontend

        const data = await User.find({ email: uid });

        if (!data.length) {
            return res.json({
                status: "FAILED",
                message: "User not found",
            });
        }

        const user = data[0];
        if (user.expiresAt < Date.now()) {
            return res.json({
                status: "FAILED",
                message: "OTP expired",
            });
        }

        // Compare the provided OTP with the stored hashed OTP
        const result = otp == user.otp;
        console.log('otp:', otp, 'user.otp:', user.otp, 'result:', result);

        if (result) {
            // OTP is valid, update user as verified
            // await User.updateOne({ _id: userId }, { verified: true });

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
    } catch (err) {
        console.error(err);
        res.json({
            status: "FAILED",
            message: "An error occurred",
        });
    }
});

//verify email
// router.get("/verify/:userId/:uniqueString", async (req, res) => {
//     let { userId, uniqueString } = req.params;

//     try {
//         // Check if user exists
//         const userVerification = await UserVerification.findOne({ userId });

//         if (!userVerification) {
//             let message = "Account record doesn't exist or has been verified already. Please sign up or login!";
//             return res.redirect(`/users/verified/error=true&message=${message}`);
//         }

//         const { expiresAt, uniqueString: hashedUniqueString } = userVerification;

//         // Check if the verification record has expired
//         if (expiresAt < Date.now()) {
//             // The record is no longer valid, delete it and the user
//             await UserVerification.deleteOne({ userId });
//             await User.deleteOne({ _id: userId });

//             let message = "Link has expired. Please sign up again!";
//             return res.redirect(`/users/verified/error=true&message=${message}`);
//         }

//         // Compare the hashed unique string with the unique string passed
//         const uniqueStringMatch = await bcrypt.compare(uniqueString, hashedUniqueString);

//         if (uniqueStringMatch) {
//             // Strings match, update the user record to show verified
//             await User.updateOne({ _id: userId }, { verified: true });
//             // Delete the user verification record after successful verification
//             await UserVerification.deleteOne({ userId });

//             return res.sendFile(path.join(__dirname, "./../views/verified.html"));
//         } else {
//             // Existing record but incorrect verification details passed
//             let message = "Invalid verification details passed. Check your inbox!";
//             return res.redirect(`/users/verified/error=true&message=${message}`);
//         }
//     } catch (error) {
//         console.log(error);
//         let message = "An error occurred while verifying email!";
//         return res.redirect(`/users/verified/error=true&message=${message}`);
//     }
// });


// ...


//verified page route
// router.get("/verified", (req, res) => {
//     res.sendFile(path.join(__dirname, "./../views/verified.html"));
// })


// router.post("/verify-otp/:userId", async (req, res) => {
//     const { userId } = req.params;
//     const { otp } = req.body;

//     // Retrieve the user from the database
//     const user = await User.findById(userId);

//     if (!user) {
//         return res.json({
//             status: "FAILED",
//             message: "User not found",
//         });
//     }

//     // Compare the provided OTP with the stored hashed OTP
//     const result = await bcrypt.compare(otp.toString(), user.password);

//     if (result) {
//         // OTP is valid, update user as verified
//         await User.updateOne({ _id: userId }, { verified: true });

//         res.json({
//             status: "SUCCESS",
//             message: "Account verified successfully!",
//         });
//     } else {
//         res.json({
//             status: "FAILED",
//             message: "Invalid OTP",
//         });
//     }
// });

//signin route
// router.post("/signin", (req, res) => {
//     let { email } = req.body;

//     email = email.trim();
//     password = password.trim();

//     if (email == "" || password == "") {
//         res.json({
//             status: "FAILED",
//             message: "Empty credentials supplied",
//         });
//     } else {
//         User.find({ email })
//             .then((data) => {

//                 if (data.length) {
//                     //user exists
//                     if (!data[0].verified) {
//                         //check if verified is false
//                         res.json({
//                             status: "FAILED",
//                             message: "Email has not been verified yet. check inbox!",
//                         });
//                     } else {
//                         const hashedPassword = data[0].password;
//                         bcrypt
//                             .compare(password, hashedPassword)
//                             .then((result) => {
//                                 if (result) {
//                                     res.json({
//                                         status: "SUCCESS",
//                                         message: "SignIn Successful",
//                                         data: data,
//                                     });
//                                 } else {
//                                     res.json({
//                                         status: "FAILED",
//                                         message: "Invalid password entered!",
//                                     });
//                                 }
//                             })
//                             .catch((err) => {
//                                 res.json({
//                                     status: "FAILED",
//                                     message: "An error occured while comparing passwords",
//                                 });
//                             });
//                     }



//                 } else {
//                     res.json({
//                         status: "FAILED",
//                         message: "Invalid Credentials entered!",
//                     });
//                 }
//             })
//             .catch((err) => {
//                 res.json({
//                     status: "FAILED",
//                     message: "An error occured while checking for existing user",
//                 });
//             });
//     }
// });

router.post("/signin", (req, res) => {

    // gernerate the otp and send it to the user
    let { email } = req.body;
    console.log('Received data login:', email, /*password*/); // recieved from frontend


    email = email.trim();
    // password = password.trim();

    if (email == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied",
        });
    } else {
        User.find({ email })
            .then((data) => {

                if (data.length) {
                    otp = generateOTP();
                    User.updateOne({ _id: data[0]._id }, { otp: otp.toString(), createdAt: Date.now(), expiresAt: Date.now() + 300000 })
                        .then((result) => {
                            console.log(`Updated OTP successfully for user with _id: ${data[0]._id}`);
                            const email_id = { email: data[0].email,_id : data[0]._id};
                            sendVerificationEmail(email_id, otp, res);
                            // You can handle the result if needed
                        })
                        .catch((error) => {
                            console.error(`Error updating OTP for user with _id: ${data[0]._id}`, error);
                            // Handle the error
                            res.json({
                                status: "FAILED",
                                message: "can't update otp",
                            });
                        });

                    /*if (!data[0].verified) {
                        res.json({
                            status: "FAILED",
                            message: "Email has not been verified yet. check inbox!",
                        });
                    } else {
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

                    }*/



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
