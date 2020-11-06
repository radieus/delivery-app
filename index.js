const express = require('express');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.listen(3001, () => {
    console.log('listening at 3001')
})

app.use(express.static('public'));
app.use(express.json());

points = [];
//myId = uuidv4();

app.post('/api', (req, res) => {
    points.push(req.body);
    console.log(points);
    res.json('success');
});

app.get('/api/delivery/', (req, res) => {
   
})

