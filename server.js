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

    Thread.find({}, (err,thread) => {
        if(err){
            console.log("there was an error finding all threads")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find threads ${req.params.id}`,
                    error: err,
                })
            )
            return;
        }
        res.status(200).send(JSON.stringify(thread));
    });
});

// GET /thread/:id
app.get("/thread/:id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`getting a thread by id ${req.params.id}`)
    
    Thread.findById(req.params.id, (err, thread)=> {
        if(err != null){
            console.log("there was an error finding all threads")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find threads ${req.params.id}`,
                    error: err,
                })
            )
            return;
        } else if (thread === null){
            res.status(400).json({
                error: err,
                message: "could not find thread",
            });
            return;
        };
        res.status(200).send(JSON.stringify(thread));
    });
});

// POST /thread
app.post("/thread",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("posting a new thread")

    let newThread = {
        name: req.body.name || "",
        author: req.body.author || "",
        description: req.body.description || "",
        category: req.body.category || "",
        posts: [],
    }

    Thread.create(newThread, (err,thread) => {
        if(err){
            console.log("there was an error finding all threads")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find threads ${req.params.id}`,
                    error: err,
                })
            )
            return;
        }
        res.status(200).send(JSON.stringify(thread));
    });

});

// POST /post;
app.post("/post",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("posting a new post")

    let newPost = {
        author: req.body.author || "",
        body: req.body.body || "",
        thread_id: req.body.thread_id,
    };

    console.log(newPost);

    Thread.findByIdAndUpdate(req.body.thread_id, {$push:{posts: newPost}}, {new:true,}, (err, thread)=>{
        
        if(err != null){
            console.log("there was an error finding all threads")
            res.status(500).send(
                JSON.stringify({
                    message: `unable to find threads ${req.params.id}`,
                    error: err,
                })
            )
            return;
        } else if (thread === null){
            res.status(400).json({
                error: err,
                message: "could not find thread",
            });
            return;
        }
        res.status(200).json(thread.posts[thread.posts.length -1]);

    });
});

// DELETE /thread/:id
app.delete("/thread/:id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting a thread by id ${req.params.id}`)
});

// DELETE /post/:thread_id/:post_id
app.delete("/thread/:thread_id/:post_id",(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting post with id, ${req.params.post_id} in thread with id ${req.params.thread_id}`)
    Thread.findByIdAndUpdate(
        req.params.thread_id,
        {
            $pull:{
                posts:{
                    _id: req.params.post_id,
                },
            },
        },
        (err, thread) => {
            if (err != null){
                res.status(500).json({
                    error: err,
                    message: "could not delete post",
                })
                return;
            } else if (thread === null){
                res.status(404).json({
                    error: err,
                    message: "could not find thread"
                })
                return;
            }

            //find the post that was deleted
            let post;
            thread.posts.forEach((e)=>{
                if(e._id == req.params.post_id){
                    post = e;
                }
            });
            // if you cant find it return 404
            if(post == undefined){
                res.status(404).json({
                    error: err,
                    message: "could not find post",
                });
                return;
            }
            res.status(200).json(post);
        }
    )
});


module.exports = app;

//? testing branches