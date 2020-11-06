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

app.post('/api', (req, res) => {
    console.log(req);
    req.body.id = uuidv4();
    points.push(req.body);
    console.log(points);
    res.json(points);
});

app.get('/api/deliveries/', (req, res) => {
    console.log("GET deliveries");
    res.json(points);
});

app.put('/api/deliveries/:id', (req, res) => {
    const { id } = req.params;
    const delIndex = points.findIndex((p) => p.id === id);
    console.log(delIndex);

    points[delIndex] = {...req.body, id: points[delIndex].id};
    // TODO: update this point
    console.log(points);
    

    res.send("Updated");
});

