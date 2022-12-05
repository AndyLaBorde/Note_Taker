const fs = require('fs');
const path = require('path');
const api = require('./routes/index.js');
const notes = require('./routes/notes.js');
const util = require('./helpers/fsUtils');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
// name='Ben' access this as JSON
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notes);
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})


// listener on port 3001
app.listen( PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);