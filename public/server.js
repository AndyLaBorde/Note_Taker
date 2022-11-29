const fs = require('fs')
const path = require('path')
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');


// require express
const express = require('express');
const { Z_ASCII } = require('zlib');
// const { title } = require('process');

const PORT = process.env.PORT || 3001;

const app = express();
// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
// name='Ben' access this as JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content), (err) => 
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if(err) {
            console.erroe(err);
        }
        else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
}

app.get("api/notes", (req, res) => {
    console.info(`${req.method} recieved for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
});

app.post("api/notes", (req, res) => {
    console.info(`${req.method} request recieved to add notes`);
    const { text, title } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        
        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: 'success', 
            body: newNote,
        };

        res.status(201).json(response);
    }
    else {
        res.status(500).json('error: could not add note')
}
});

// listener on port 3001
app.listen( PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);