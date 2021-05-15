const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const { auth } = require('../../middleware');

router.get('/:id', auth, postController.getDetailPost);
router.post('/', auth, postController.createNewPost);
router.get('/', auth, postController.getAllPost);

module.exports = router;