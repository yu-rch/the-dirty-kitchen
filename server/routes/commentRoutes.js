const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/getComments', commentController.getComments);
router.post('/createComments', commentController.createComments);
router.delete('/deleteComments/:id', commentController.deleteComments);
router.put('/updateComments/:id', commentController.updateComments);

module.exports = router;
