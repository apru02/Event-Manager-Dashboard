// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Route for creating a new user
// router.post('/uploadImage', fetchuser,async (req, res) => {
//   try {
//     const { username } = req.body;
//     const { filename } = req.file;

//     const user = new User({ username, photo: filename });
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// module.exports = router;
