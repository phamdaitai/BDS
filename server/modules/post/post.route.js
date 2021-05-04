const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const { auth } = require('../../middleware');

router.post('/', auth, postController.createNewPost);

module.exports = router;