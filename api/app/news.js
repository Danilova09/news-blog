const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        let query = 'SELECT id, title, image, datetime FROM news';
        let [news] = await db.getConnection().execute(query);
        return res.send(news);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [news] = await db.getConnection().execute('SELECT * FROM news WHERE id = ?', [req.params.id]);

        const newsItem = news[0];

        if (!newsItem) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(newsItem);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image') ,async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description) {
            return res.status(400).send({message: 'Title and description are required'});
        }
        const news = {
            title: req.body.title,
            description: req.body.description,
            image: null,
        };
        if (req.file) {
            news.image = req.file.filename;
        }
        let query = 'INSERT INTO news (title, description, image) VALUES (?, ?, ?)';
        const [results] = await db.getConnection().execute(query, [
            news.title,
            news.description,
            news.image
        ]);

        const id = results.insertId;
        return res.send({message: 'Created new news', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const newsId = req.params.id;
        await db.getConnection().execute(`DELETE FROM comments WHERE news_id = ${newsId}`);
        await db.getConnection().execute(`DELETE FROM news WHERE id = ${newsId}`);
        res.send(`newsItem was deleted`);
    } catch (e) {
        next(e);
    }
});

module.exports = router;