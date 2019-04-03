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

Sample call: `/api/courses?mnemonic=CS`
Sample response:
```
{
    "APMA1090": {
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
            ...
        ]
    },
    "APMA1110": {
        "sections": [
            {
                "ClassNumber": "15450",
                "Mnemonic": "APMA",
                "Number": "1110",
                ...
            }
            ...
        ]
    },
    ...
}
```
