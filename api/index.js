const express = require('express');
const cors = require('cors');
const news = require('./app/news');
const app = express();

const port = 5000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', news);

const run = async () => {

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => console.error(e));