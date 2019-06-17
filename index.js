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


app.route('/ratedAlbums')
    .get((req, res) => {
        client.connect((err) => {
            if (!err) {
                const db = client.db(dbName);
                db.collection('ratedAlbums').find({}).toArray((err, result) => {
                    res.json(result);
                    console.log(result)
                })
            } else {
                res.json({
                    message: 'Error getting entries from database!'
                });
            }
        })
    })






app.listen(port, () => {
    console.log('Server is running!');
});