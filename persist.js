const mongoose = require("mongoose");
const db = mongoose.connection;

function connect(callback){
    let connectionString = (`mongodb+srv://dbMaster:myCoolPassword@cluster-1.0hzau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

    console.log("connecting to cluster-1...")
    mongoose
        .connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err)=>{
            console.log("there was an error connecting to mongo: ", err)
        });
}

function onConnect(callback){
    db.once("open", callback);
}

module.exports = {
    "connect": connect,
    "onConnect": onConnect
}