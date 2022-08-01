const { MongoClient, ObjectId } = require("mongodb");
const Express = require("express");
const BodyParser = require('body-parser');
var uri = "mongodb+srv://Test:Password@simulationresults.uariljv.mongodb.net/?retryWrites=true&w=majority"; // This is set to a user to have temporary read/write on my account. Will need to be changed with new MongoDB account.
const server = Express();
const client = new MongoClient(uri);
const cors = require('cors');
server.use(cors());
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));



var collection;


server.post("/Results", async (req, response, next) => {
    try {
        let result = await collection.insertOne(req.body);
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.get("/Results/:record_id", async (req, response, next) => {
    var record_id = req.params.record_id;
    try {
        let result = await collection.findOne({"Username":record_id});
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

const port = process.env.port || 3000;

server.listen(port, async () => {
    try {
        await client.connect();
        collection = client.db("Simulation").collection("Results");
        console.log("Listening at :3000...");
    } catch (e) {
        console.error(e);
    }
});
