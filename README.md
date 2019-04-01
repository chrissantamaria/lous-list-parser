# Lou's List Parser

Web scaping API server using Lou's List to grab University of Virginia course information

# Current features
* Converting from course mnemonics (ex: 'MDST') to full department names (ex: 'Media Studies')

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
*  Sample call: `/api/mnemonic?mnemonic=CS` returns 'Computer Science'