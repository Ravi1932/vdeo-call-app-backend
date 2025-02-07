const userMobile = require("../models/usermodel");
const { sendEmail } = require("../services/emailService");
const path = require('path');
const fs = require('fs');
const messageSchema = require("../models/chatmodal");


exports.getChats = async (req, res) => {
    try {
        const messages = await messageSchema.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { type, message, time, senderID, receiverID } = req.body;

        const newMessage = await messageSchema.create({ type, message, time, senderID, receiverID });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await userMobile.findOne({ lastname: email })
        let response = [];
        if (userData) {
            response = {
                success: true,
                msg: "User Details",
                data: userData
            }
        } else {
            response = {
                success: false,
                msg: "User not found.",
            }
        }
        res.status(200).send(response);


        // if (userData) {
        //     const passwordMatch = bcryptjs.compare(password, userData.password);
        //     if (passwordMatch) {
        //         const userResult = {
        //             email: userData.email,
        //             password: userData.password
        //         }
        //         const response = {
        //             success: true,
        //             msg: "User Details",
        //             data: userResult
        //         }
        //         res.status(200).send(response);
        //     } else {
        //         res.status(400).send({ success: false, msg: "Login details are incorrect" });
        //     }
        // } else {
        //     res.status(400).send({ success: false, msg: "Login details are incorrect" });
        // }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

// exports.reg = async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     await collection.insertMany([data])

//     res.render("home")
// };

// exports.userLogin = async (req, res) => {
//     try {
//         const check = await userLogin.findOne({
//             email: req.body.email
//         })
//         if (check.password !== req.body.password) {
//             res.send("wrong password")
//         }

//         jwt.sign({ check }, secretKey, { expiresIn: '300s' }, (err, token) => {
//             res.json({
//                 token
//             });
//         })
//     } catch {
//         res.send("wrong details")
//     }
// };

// exports.addUser = async (req, res) => {
//     try {
//         const addUserRecord = new userMobile(req.body)
//         const insertUser = await addUserRecord.save();
//         await sendEmail(insertUser.email, "Welcome to Our Platform");
//         console.log('insertUser',insertUser);

//         res.status(201).json({ message: "User added successfully!",user: insertUser  });
//     } catch (e) {
//         console.log('e',e);

//         res.status(400).send(e)
//     }
// }

exports.addUser = async (req, res) => {
    try {
        const { imageBase64, userId, ...userData } = req.body;
        let profileImageUrl = '';
        let addUserRecord = new userMobile(userData);
        const insertUser = await addUserRecord.save();

        const generatedUserId = insertUser._id.toString();

        if (imageBase64) {
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const uploadsDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const fileName = `profile-${generatedUserId}.jpg`;
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, buffer);

            profileImageUrl = 'demo';

            insertUser.profileImagePath = profileImageUrl;
            await insertUser.save();
        }

        await sendEmail(insertUser.email, "Welcome to Our Platform");
        res.status(201).json({
            message: "User added successfully!",
            user: insertUser
        });

    } catch (e) {
        console.error('Error:', e);
        res.status(400).send(e);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userMobile.find();
        res.json(user);
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const _id = req.params.id
        console.log('_id', _id);

        const updateUser = await userMobile.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        console.log('updateUser', updateUser);

        res.json({ updateUser })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const _id = req.params.id
        const deleteUser = await userMobile.findByIdAndDelete(_id)
        console.log('updateUser', deleteUser);
        res.json({ message: "User deleted successfully" })
    } catch (e) {
        res.status(400).send(e)
    }
}


