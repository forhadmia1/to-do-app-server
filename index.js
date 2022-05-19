const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s7c5u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const taskCollection = client.db('todoapp').collection('task');

        // post data
        app.post('/addTask', async (req, res) => {
            const data = req.body;
            const result = await taskCollection.insertOne(data);
            res.send(result)
        })


    } finally {

    }
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('getting started to do app')
})
app.listen(port, () => {
    console.log('listening port', port)
})