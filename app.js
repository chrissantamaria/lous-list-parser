const axios = require('axios');
const querystring = require('querystring');
const { JSDOM } = require('jsdom');

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

const mnemonicToName = async mnemonic => {
    const page = await axios({
        method: 'post',
        url: 'http://rabi.phys.virginia.edu/mySIS/CS2/page.php?Semester=1198&Type=Search',
        data: querystring.stringify({ iMnemonic: mnemonic }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const dom = new JSDOM(page.data);
    let name;
    try {
        name = dom.window.document.querySelector('body > table:nth-child(7) > tbody > tr:nth-child(2) > td').innerHTML;
    } catch (e) {
        throw new Error('No department name found, likely an invalid query');
    }
    return name;
};

// One-time run
const data = 'AAS CZ FRTR KOR PSYC SPTR AMEL EAST GDS LATI RELA SRBC AMST ECON GERM LING RELB STS AMTR ENAM GETR LNGS RELC SWAG ANTH ENCR GREE MDST RELG SWAH AR H ENEC HEBR MEST RELH SWED ARAB ENGL HIAF MSP RELI TBTN ARTH ENGN HIEA MUSI RELJ TURK ARTR ENLS HIEU PERS RELS UKR ASL ENLT HILA PETR RUSS URDU BULG ENMC HIME PHIL RUTR YIDD CCFA ENMD HIND PLAD SANS CCIA ENNC HISA PLAP SATR CCLT ENRN HIST PLCP SCAN CCSS ENSP HIUS PLIR SLAV CHIN ENWR ITAL PLPT SLFK CHTR ETP* ITTR POL SLTR CLAS FREN JAPN PORT SOC CPLT JPTR POTR SPAN';
data.split(' ').forEach(async mnemonic => {
    try {
        console.log(`${mnemonic} => ${await mnemonicToName(mnemonic)}`);
    } catch (e) {
        console.error(`No name found for ${mnemonic}`);
    }
});