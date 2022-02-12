const express = require('express');
const cors = require('cors');
const db = require('./mySqlDb');
const news = require('./app/news');
const comments = require('./app/comments');
const app = express();

const port = 5000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', comments);

const run = async () => {
    await db.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => console.error(e));