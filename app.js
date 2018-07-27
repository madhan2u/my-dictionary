const express = require('express');

// to parse POST request data(body)
const bodyParser = require("body-parser");

// to share below API resources - Cross Origin Resource Sharing
const cors = require("cors");
const app = express();

let dicTerms = [{
    term: 'Internet',
    description: 'The Internet is the network of computers we’re all familiar with.'
}, {
    term: 'Web Browser',
    description: 'A program you use to look at, and navigate between, pages on the World Wide Web.'
}, {
    term: 'Bandwidth',
    description: 'Bandwidth is an indication of how quickly data travels along a connection. '
}, {
    term: 'Modem',
    description: 'From “MOdulator/DEModulator” came the word modem.'
}, {
    term: 'Memory',
    description: 'This is more accurately called RAM or “random-access memory”. '
}, {
    term: 'Disk Space',
    description: 'Disk space (or “hard disk space”), on the other hand, is a more permanent store that holds files even when the computer is switched off. '
}, {
    term: 'Virus',
    description: 'A virus is a piece of software that can copy itself and which attaches itself to some other program in order to survive and replicate.'
}, {
    term: 'Cookie',
    description: 'A small text file sent to your computer by a web site you have visited.'
}, {
    term: 'Firewall',
    description: 'A firewall is a piece of computer software or hardware that restricts the data that is allowed to flow through.'
}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static('./public'));

app.use(cors());

app.get('/dictionary-api', (req, res) => {
    res.json(dicTerms);
})

app.post("/dictionary-api", (req, res) => {
    dicTerms.push(req.body);
    res.json(dicTerms);
});

app.delete('/dictionary-api/:term', (req, res) => {
    dicTerms = dicTerms.filter((trm) => trm.term.toLowerCase() !== req.params.term.toLowerCase());
    res.json(dicTerms);
});

app.listen(3000, () => console.log('Express app running on port 3000'));

module.exports = app;



