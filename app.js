const { mnemonicToName, getCourses } = require('./utils');

const express = require('express');
const app = express();
app.listen(8080, () => {
    console.log('Server listening on 8080');
});

app.get('/api/mnemonic', async (req, res) => {
    try {
        const name = await mnemonicToName(req.query.mnemonic);
        res.status(200).send(name);
    } catch (e) {
        console.error(e);
        res.status(400).send(e.stack);
    }
});
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await getCourses(req.query);
        res.status(200).json(courses);
    } catch (e) {
        console.error(e);
        res.status(400).send(e.stack);
    }
});