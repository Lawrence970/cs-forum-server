const server = require("./server");
const persist = require("./persist");
const models = require("./model.js");

const port = process.argv[2] || process.env.PORT || 8080;

persist.onConnect(() => {
    server.listen(port, () =>{
        console.log(`code school forum app running on port ${port}`)
    })
})

persist.connect();