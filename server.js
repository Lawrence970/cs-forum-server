const express = require("express");
const cors = require("cors");
const {Thread} = require("./model.js")

const app = express();

app.use(cors());
app.use(express.json({}));


// GET /thread

// GET /thread/:id

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id


module.exports = app;