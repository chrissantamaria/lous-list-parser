# Lou's List Parser

Web scaping API server using Lou's List to grab University of Virginia course information

# Current features
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

Sample call: `/api/mnemonic?mnemonic=CS`
Sample response: `Computer Science`

`GET` ***/api/courses***

Sample call: `/api/courses?mnemonic=APMA`
Sample response:
```
{
    "STS1499": {
        "sections": [
            {
                "ClassNumber": "16388",
                "Mnemonic": "STS",
                "Number": "1499",
                "Section": "001",
                "Type": "Lecture",
                "Units": "3",
                "Instructor(s)": "Catherine Baritaud",
                "Days": "We 3:30PM - 6:00PM",
                "Room": "Materials Science Bldg 171",
                "Title": "Introduction to Technical Communications for Non-Native Speakers",
                "Topic": "",
                "Status": "Open",
                "Enrollment": "0",
                "EnrollmentLimit": "20",
                "Waitlist": "0",
                "CombinedWith": "",
                "Description": "Instruction in communication for students whose first language is not English. Specialized instruction in academic/content area communication as well as personal expression in a variety of settings will enable students to complete academic programs in a more efficient and timely manner. After completion of this course, students must complete STS 1500 by the end of  their first year of residency in SEAS. May be counted as an unrestricted elective."
            }
        ],
        "averageGPA": 3.37,
        "professors": "Catherine Baritaud"
    },
    "STS1500": {
        "sections": [
            {
                "ClassNumber": "16036",
                "Mnemonic": "STS",
                "Number": "1500",
                ...
            },
            {
                "ClassNumber": "16084",
                "Mnemonic": "STS",
                "Number": "1500",
                ...
            },
            ...
        ],
        "averageGPA": 3.35333333333333,
        "professors": "Benjamin Laugelli, Toluwalogo Odumosu, W Carlson, Matthew Henderson, Peter Westin"
    },
    ...
}
```
