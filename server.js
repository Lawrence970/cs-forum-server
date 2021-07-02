const express = require("express");
const cors = require("cors");
const {Thread} = require("./model.js")

const app = express();

app.use(cors());
app.use(express.json({}));


// GET /thread
app.get("/thread",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("getting all threads")

    console.log("hello")

    Thread.find(function(err,threads){
        if(err){
            console.log("there was an error finding all threads")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find thread ${req.params.id}`,
                    error: err,
                })
            )
        }
        res.status(200).send(JSON.stringify(threads));
    });
});

// GET /thread/:id

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id


module.exports = app;