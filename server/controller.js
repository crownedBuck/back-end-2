const houses = require("./db.json");
let globalId = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body

        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }

        globalId++

        houses.push(newHouse)
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params

        const index = houses.findIndex(house => {
            console.log(house, id)

            return house.id === +id
        })

        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        const index = houses.findIndex(house => {
            return house.id === +id
        })

        if (houses[index].price === 0 && type === 'minus') {
            res.status(400).send("price cannot be negitive")
        } else if (type === "plus") {
            houses[index].price = 10000 + houses[index].price
            res.status(200).send(houses)
        } else if (type === "minus") {
            houses[index].price = houses[index].price - 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }

        console.log(id, type)
    }
}