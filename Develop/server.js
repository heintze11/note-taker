const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);


