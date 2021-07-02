const express = require("express");
const cors = require("cors");
const {Thread} = require("./model.js")

const app = express();

app.use(cors());
app.use(express.json({}));


// GET /thread

// GET /thread/:id
app.get("/thread/:id", (req,res)=>{
    res.setHeader("Content-Type","application/json");
    Todo.findById(req.params.id, (err, todo)=>{
        if(err) { // is error true?
            console.log("there was an error finding a todo with id")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find todo with id ${req.params.id}`,
                    error: err,
                })
            );
            return;
        } else if (todo === null){
            res.status(404).send(
                JSON.stringify({
                    message: `todo = null`,
                    error: err,
                })
            )
            return;
        }
        // can also do res.send(200).json(todo) {helper function} 
        res.status(200).send(JSON.stringify(todo));
    });
});

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id


module.exports = app;