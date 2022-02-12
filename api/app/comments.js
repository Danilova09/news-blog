const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {

        if (req.query.news_id) {
            console.log(req.query.news_id);
        }

        let query = 'SELECT id, author, comment, news_id FROM comments';
        let [comments] = await db.getConnection().execute(query);
        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

router.post('/' ,async (req, res, next) => {
    try {
        if (!req.body.description || !req.body.news_id) {
            return res.status(400).send({error: 'Fill in required fields'});
        }

        const comment = {
            news_id: parseInt(req.body.news_id),
            author: req.body.author,
            description: req.body.description,
        };
        
        let query = 'INSERT INTO comments (author, description, news_id) VALUES (?, ?, ?, ?, ?)';

        const [results] = await db.getConnection().execute(query, [
            comment.author,
            comment.description,
            comment.news_id,
        ]);

        const id = results.insertId;
        return res.send({message: 'Created new comment', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const commentsId = req.params.id;
        await db.getConnection().execute(`DELETE FROM comments WHERE id = ${commentsId}`);
        res.send(`comment was deleted`);
    } catch (e) {
        next(e);
    }
});

module.exports = router;