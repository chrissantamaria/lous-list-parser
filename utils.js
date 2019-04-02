const axios = require('axios');
const querystring = require('querystring');
const { JSDOM } = require('jsdom');
const csvtojson = require('csvtojson');
const _ = require('lodash');

const mnemonicToName = async mnemonic => {
    const page = await axios({
        method: 'post',
        url: 'http://rabi.phys.virginia.edu/mySIS/CS2/page.php?Semester=1198&Type=Search',
        data: querystring.stringify({ iMnemonic: mnemonic })
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

const getCourses = async mnemonic => {
    const csvData = await axios({
        method: 'post',
        url: 'http://rabi.phys.virginia.edu/mySIS/CS2/deliverSearchData.php?Semester=1198',
        data: querystring.stringify({ iMnemonic: mnemonic })
    });
    const csv = await csvtojson().fromString(csvData.data);
    const groupedCourses = _(csv)
        .groupBy(course => course.Mnemonic + course.Number)
        .value();
    return groupedCourses;
};

module.exports = {
    mnemonicToName,
    getCourses
};