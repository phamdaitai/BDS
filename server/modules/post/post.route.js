const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const { auth } = require('../../middleware');

router.get('/:id', postController.getDetailPost);
router.post('/', auth, postController.createNewPost);
router.get('/', postController.getAllPost);

module.exports = router;