const axios = require('axios');
const querystring = require('querystring');
const { JSDOM } = require('jsdom');
const csvtojson = require('csvtojson');

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

const getCourses = async query => {
    const csv = await axios({
        method: 'post',
        url: 'http://rabi.phys.virginia.edu/mySIS/CS2/deliverSearchData.php?Semester=1198',
        data: querystring.stringify({
            iMnemonic: query.mnemonic,
            iBuilding: query.building,
            iDays: query.days,
            iDescription: query.description,
            iDiscipline: query.discipline,
            iGroup: query.group,
            iInstructor: query.instructor,
            iMinCurEnroll: query.minCurrentEnroll,
            iMaxCurEnroll: query.maxCurrentEnroll,
            iMinCurWaitlist: query.minCurrentWaitlist,
            iMaxCurWaitlist: query.maxCurrentWaitlist,
            iMinPosEnroll: query.minTotalEnroll,
            iMaxPosEnroll: query.maxTotalEnroll,
            iNumber: query.number,
            iRoom: query.room,
            iStatus: query.status,
            iTime: query.time,
            iTitle: query.title,
            iTopic: query.topic,
            iType: query.type,
            iUnits: query.units
        })
    });
    const courses = await csvtojson().fromString(csv.data);

    const coursesGrouped = {};
    for (const section of courses) {
        const name = section.Mnemonic + section.Number;
        if (!(name in coursesGrouped)) {
            coursesGrouped[name] = { sections: [] };
        }
        coursesGrouped[name].sections.push(section);
    }

    for (const course in coursesGrouped) {
        // Adding average GPA data to each course   
        const gradeData = await axios({
            method: 'get',
            url: `https://vagrades.com/api/uvaclass/${course}`
        });
        // Only setting average GPA if VAGrades has data on the course
        if (gradeData.data.course)
            coursesGrouped[course].averageGPA = gradeData.data.course.avg;

        // Finding all unique professors
        const professors = new Set();
        for (const section of coursesGrouped[course].sections) {
            for (const professor of section['Instructor(s)'].split(',')) {
                professors.add(professor);
            }
        }
        coursesGrouped[course].professors = [...professors].join(', ');
    }

    return coursesGrouped;
};

module.exports = {
    mnemonicToName,
    getCourses
};