const fs = require('fs')
const path = require('path')
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');


// require express
const express = require('express');
// const { title } = require('process');

const PORT = process.env.PORT || 3001;

const app = express();
// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
// name='Ben' access this as JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
