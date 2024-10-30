const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextID = 1;

app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = {
        id: nextID++,
        name, 
        price
    };
    teaData.push(newTea);
    res.status(200).send({ message: "Tea Added Successfully...", teaData });
});

app.get('/getTea', (req, res) => {
    res.send({ message: 'Tea fetched Successfully', teaData });
});

app.get("/getTea/:id", (req, res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send({ message: "Tea not found..." });
    }
    res.status(200).send({ message: "Your tea is here", tea });
});

app.put("/update/:id", (req, res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send({ message: "Tea not found..." });
    } 
    tea.price = "300 bucks"; // Static price update as per code
    res.status(200).send({ message: "Updated Successfully", tea });
});

app.delete('/tea/:id', (req, res) => {
    const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send({ message: "Tea not found" });
    }
    teaData.splice(index, 1);
    res.status(200).send({ message: "Tea deleted successfully", teaData });
});

app.listen(port, () => {
    console.log('Server is up and running...');
});
