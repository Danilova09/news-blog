const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();


router.get('/', async (req, res, next) => {
    res.send('news');
});

router.get('/:id', async (req, res, next) => {
    res.send('news by id');

});

router.post('/', async (req, res, next) => {
    res.send('news posted');
});

module.exports = router;