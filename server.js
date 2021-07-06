const express = require("express");
const cors = require("cors");
const {Thread} = require("./model.js")

const app = express();

app.use(cors());
app.use(express.json({}));

app.use(express.static("static"))


// GET /thread
app.get("/thread",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("getting all threads")

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
app.get("/thread/:id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`getting a thread by id ${req.params.id}`)

});

// POST /thread
app.post("/thread",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("posting a new thread")
});

// POST /post;
app.post("/post",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("posting a new post")
});

// DELETE /thread/:id
app.delete("/thread/:id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting a thread by id ${req.params.id}`)
});

// DELETE /post/:thread_id/:post_id
app.delete("/thread/:thread_id/:post_id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting post in thread by id ${req.params.post_id}`)
});


module.exports = app;