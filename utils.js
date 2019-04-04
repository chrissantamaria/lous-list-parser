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
    const sections = await csvtojson().fromString(csv.data);

    // Grouping sections using a key for each course
    const courses = sections.reduce((obj, section) => {
        const name = section.Mnemonic + section.Number;
        obj[name] = obj[name] || [];
        obj[name].push(section);
        return obj;
    }, {});
    // Mapping each course to an object containing an array of sections
    const coursesGrouped = Object.keys(courses).map(key => (
        { name: key, sections: courses[key] }
    ));

    for (const course of coursesGrouped) {
        // Fetching grade distribution data from VAGrades
        const gradeData = await axios.get(`https://vagrades.com/api/uvaclass/${course.name}`);
        if (gradeData.data.course)
            course.gpa = gradeData.data.course.avg;

        // Finding all unique professors
        const professors = new Set();
        for (const section of course.sections) {
            for (const professor of section['Instructor(s)'].split(',')) {
                professors.add(professor);
            }
        }
        course.professors = [...professors].join(', ');

        // Grabbing the full course title from the first section
        // (for now assuming all section titles are identical)
        course.title = course.sections[0].Title;
    }

    return coursesGrouped;
};

module.exports = {
    mnemonicToName,
    getCourses
};