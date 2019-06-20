const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

//db setup
const url = 'mongodb://localhost:27017';
const dbName = 'listeningList';
const client = new MongoClient(url);

//core app setup
const app = express();
const port = 9001;

var jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
})


app.route('/ratedAlbums')
    .get((req, res) => {
        client.connect((err) => {
            if (!err) {
                const db = client.db(dbName);
                db.collection('ratedAlbums').find({}).toArray((err, result) => {
                    res.json({
                        status: 200,
                        message: 'Request ok, getting rated albums',
                        data: [result]
                    });
                })
            } else {
                res.json({
                    status: 500,
                    message: 'Error getting entries from database!',
                    data: []
                });
            }
        })
    })
    .post(jsonParser, (req, res) => {
        var data = req.body;
        if (typeof data !== undefined && data !== '') {
            client.connect((err) => {
                if (!err) {
                    const db = client.db(dbName);
                    db.collection('ratedAlbums').insertOne(data, (err, result) => {
                        res.json({
                            status: 200,
                            message: 'new item added',
                            data: [data]
                        })
                    })
                } else {
                    res.json({
                        status: 500,
                        message: 'Item not added, error adding to database',
                        data: []
                    })
                }
            })
        }
    })






app.listen(port, () => {
    console.log('Server is running!');
});