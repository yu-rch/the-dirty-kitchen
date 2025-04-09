const CommentModel = require('../models/Comment');

const getComments = (req, res) => {
    CommentModel.find()
        .then(comments => res.json(comments))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const createComments = (req, res) => {
    const newComment = new CommentModel(req.body);
    newComment.save()
        .then(comment => res.json(comment))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const deleteComments = (req, res) => {
    CommentModel.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`Comment with id: ${req.params.id} deleted successfully`);
            res.json({ message: "Comment deleted" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const updateComments = (req, res) => {
    CommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(comment => res.json(comment))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

module.exports = { getComments, createComments, deleteComments, updateComments };
