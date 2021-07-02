// this file is where all the data[types] go
const mongoose = require("mongoose")

const threadSchema = mongoose.Schema({ // this is a schema. it contains all datatypes
    name: String, //headline
    author: String,
    description: String,
    category: String,
    
});


const Thread = mongoose.model("Thread", threadSchema); // setting the variable Todo to the todoSchema and naming it "Todo"


// let store = {}; depricated

module.exports = {
    Thread,
}
