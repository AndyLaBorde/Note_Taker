const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)
notes.post("/", (req, res) => {
    console.info(`${req.method} request received to add notes`);

    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;

    if (title && text) {
        // variable for the object we are saving
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        // return db.json file return all saved notes as JSON and append new note
        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
    } else {
        res.status(500).json('error could not add note');
    }
})

// notes.delete('/', (req, res) => {

// })

module.exports = notes;