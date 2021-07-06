// this file is where all the data[types] go
const mongoose = require("mongoose");


const postSchema = mongoose.Schema(
    {
        author: String,
        body: String,
        thread_id: {type: mongoose.Schema.Types.ObjectId, ref: "Thread"},
    },

    { // passing in options
        timestamps: true
    }

);

const threadSchema = mongoose.Schema(
    { // this is a schema. it contains all datatypes
        name: String, //headline
        author: String,
        description: String,
        category: String,
        posts: [postSchema]
    },
    { // passing in options
        timestamps: true
    }
);


const Thread = mongoose.model("Thread", threadSchema); // setting the variable Todo to the todoSchema and naming it "Todo"
const Post = mongoose.model("Post", postSchema);

// let store = {}; depricated

module.exports = {
    Thread,
    Post,
}
