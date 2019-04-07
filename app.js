const { mnemonicToName, getCourses } = require('./utils');

const express = require('express');
const app = express();
app.listen(4200, () => {
    console.log('Server listening on 4200');
});

app.get('/api/mnemonic', async (req, res) => {
    try {
        const name = await mnemonicToName(req.query.mnemonic);
        res.status(200).json({ data: { name: name } });
    } catch (e) {
        console.error('/api/mnemonic error:', e);
        res.status(400).json({ error: e.stack });
    }
});
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await getCourses(req.query);
        res.status(200).json({ data: courses });
    } catch (e) {
        console.error('/api/courses error:', e);
        res.status(400).json({ error: e.stack });
    }
});