const express = require('express')
const path = require('path');

const cors = require('cors')
console.log("index.js is working")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile('/static/index.html', {root: __dirname});
})

const {getHouses,
        createHouse,
        deleteHouse,
        updateHouse } = require('./controller')

app.get(`/api/houses`, getHouses)
app.post(`/api/houses`, createHouse)
app.delete(`/api/houses/:id`, deleteHouse)
app.put(`/api/houses/:id`, updateHouse)

app.listen(4000, () => console.log(`Server running on port 4000`))