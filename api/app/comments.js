const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let query = 'SELECT id, title, image, datetime FROM comments';
        let [comments] = await db.getConnection().execute(query);
        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [comments] = await db.getConnection().execute('SELECT * FROM comments WHERE id = ?', [req.params.id]);

        const commentsItem = comments[0];

        if (!commentsItem) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(commentsItem);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image') ,async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description) {
            return res.status(400).send({message: 'Title and description are required'});
        }
        const comments = {
            title: req.body.title,
            description: req.body.description,
            image: null,
        };
        if (req.file) {
            comments.image = req.file.filename;
        }
        let query = 'INSERT INTO comments (title, description, image) VALUES (?, ?, ?)';
        const [results] = await db.getConnection().execute(query, [
            comments.title,
            comments.description,
            comments.image
        ]);

        const id = results.insertId;
        return res.send({message: 'Created new comments', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const commentsId = req.params.id;
        await db.getConnection().execute(`DELETE FROM comments WHERE id = ${commentsId}`);
        res.send(`commentsItem was deleted`);
    } catch (e) {
        next(e);
    }
});

module.exports = router;