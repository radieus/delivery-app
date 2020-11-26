const express = require('express');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001')
})
app.use(express.static('public'));
app.use(express.json());

points = [];

depot = {lat: 52.22926000000007, lng: 21.012440000000026}
cap = 15

app.post('/api', (req, res) => {
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

    console.log(points);
    
    return res.send("Updated");
});

app.get('/api/routes/origin', (req, res) => {
    latlngs = [depot]
    var tmp_weight = 0
    points.forEach(point => {
        if (parseInt(point.weight) > cap){
            res.status(422).send('Too big package!')
        }
        tmp_weight += parseInt(point.weight);
        if (tmp_weight > cap) {
            latlngs.push(depot)
            tmp_weight = 0
        }
        latlngs.push(point.originLatlng)
    });

    latlngs.push(depot)

    return res.json(latlngs)
})

app.get('/api/routes/destination', (req, res) => {
    latlngs = [depot]
    var tmp_weight = 0
    points.forEach(point => {
        if (parseInt(point.weight) > cap){
            res.status(422).send('Too big package!')
        }

        tmp_weight += parseInt(point.weight);
        if (tmp_weight > cap) {
            latlngs.push(depot)
            tmp_weight = 0
        }
        // add weight
        latlngs.push(point.destinationLatlng)
    });

    latlngs.push(depot)

    return res.json(latlngs)
})