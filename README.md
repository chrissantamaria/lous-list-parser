# Lou's List Parser

Web scaping API server using Lou's List to grab University of Virginia course information

## Current features
* Converting from course mnemonics (ex: 'MDST') to full department names (ex: 'Media Studies')
* Fetching all course sections for a given course mnemonic, organized by course name

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```
## API Routes
`GET` ***/api/mnemonic***

Name | Type | Description
--- | --- | ---
`mnemonic` | `string` | Mnemonic abreviation of a course department

Sample call: `/api/mnemonic?mnemonic=CS`

Sample response:
```
{
    "data": {
        "name": "Computer Science"
    }
}
```

`GET` ***/api/courses***

Name | Type | Description
--- | --- | ---
`mnemonic` | `string` | Mnemonic abreviation of a course department
`number` | `string` | Course number
`instructor` | `string` | Section instructor
`status` | `string` | "Open", "Closed", or "Wait List"
`title` | `string` | Full course title
`topic` | `string` | Section topic
`description` | `string` | Section description (can include major restrictions)
`type` | `string` | Section type (ex: "Lecture")
`building` | `string` | Building location of a section
`room` | `number` | Room number (not including building)
`units` | `number` | Number of credits
`days` | `string` | Week day abbreviations for when a section meets (ex: "MoWeFr")
`time` | `string` | Single or range of formatted time strings (ex: "1:00PM - 1:50PM")
`discipline` | `string` | Major discipline
`group` | `string` | Department group (similar to mnemonic, see Lou's List search page for specific list of groups)
`minTotalEnroll` | `number` | Minimum enrollment limit
`maxTotalEnroll` | `number` | Maxiumum enrollment limit
`minCurrentEnroll` | `number` | Minimum number of currently enrolled students
`maxCurrentEnroll` | `number` | Maxiumum number of currently enrolled students
`minCurrentWaitlist` | `number` | Minimum number of currently waitlisted students
`maxCurrentWaitlist` | `number` | Maxiumum number of currently waitlisted students

Sample call: `/api/courses?mnemonic=APMA`

Sample response:
```
{
    "data": [
        {
            "name": "APMA1090",
            "sections": [
                {
                    "ClassNumber": "15901",
                    "Mnemonic": "APMA",
                    "Number": "1090",
                    "Section": "001",
                    "Type": "Lecture",
                    "Units": "4",
                    "Instructor(s)": "Bernard Fulgham",
                    "Days": "MoWeFr 10:00AM - 10:50AM",
                    "Room": "Thornton Hall D223",
                    "Title": "Single Variable Calculus I",
                    "Topic": "",
                    "Status": "Open",
                    "Enrollment": "0",
                    "EnrollmentLimit": "41",
                    "Waitlist": "0",
                    "CombinedWith": "",
                    "Description": "The concepts of differential and integral calculus are developed and applied to the elementary functions of a single variable.  Limits, rates of change, derivatives, and integrals.  Applications are made to problems in analytic geometry and elementary physics. For students with no exposure to high school calculus."
                },
                {
                    "ClassNumber": "16632",
                    "Mnemonic": "APMA",
                    "Number": "1090",
                    ...
                }
            ],
            "gpa": 2.8,
            "professors": "Bernard Fulgham",
            "title": "Single Variable Calculus I"
        },
        {
            "name": "APMA1110",
            "sections": [
                {
                    "ClassNumber": "15450",
                    "Mnemonic": "APMA",
                    "Number": "1110",
                    ...
                },
                {
                    "ClassNumber": "15451",
                    "Mnemonic": "APMA",
                    "Number": "1110",
                    ...
                },
                ...
            ],
            "gpa": 2.95,
            "professors": "Meiqin Li, Monika Abramenko, Stacie Pisano, Staff",
            "title": "Single Variable Calculus II"
        },
        ...
    ]
}
```

## Config Options
Name | Type | Description
--- | --- | ---
`semester` | `number` | Semester code for a specific enrollment period (see Lou's List for valid codes). By default, lous-list-parser uses 1198 (Spring 2019).