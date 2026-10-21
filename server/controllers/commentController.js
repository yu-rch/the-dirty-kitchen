const db = require('../db');

const getComments = (req, res) => {
    try {
        const { idMeal } = req.query;
        let rows;
        if (idMeal) {
            rows = db.prepare(
                'SELECT id AS _id, idMeal, username, comment, createdAt FROM comments WHERE idMeal = ? ORDER BY id DESC'
            ).all(idMeal);
        } else {
            rows = db.prepare(
                'SELECT id AS _id, idMeal, username, comment, createdAt FROM comments ORDER BY id DESC'
            ).all();
        }
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createComments = (req, res) => {
    try {
        const { idMeal, username, comment } = req.body;
        if (!comment || !comment.trim()) {
            return res.status(400).json({ error: "comment is required" });
        }

        const name = (username && username.trim()) ? username.trim() : 'Anonymous';

        const info = db.prepare(
            'INSERT INTO comments (idMeal, username, comment) VALUES (?, ?, ?)'
        ).run(idMeal || '', name, comment.trim());

        const row = db.prepare(
            'SELECT id AS _id, idMeal, username, comment, createdAt FROM comments WHERE id = ?'
        ).get(info.lastInsertRowid);

        res.json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getComments, createComments };


