const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/getComments', commentController.getComments);
router.post('/createComments', commentController.createComments);

module.exports = router;
