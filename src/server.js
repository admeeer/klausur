const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json()); // Update for JSON parsing
app.use('/static', express.static('src/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html'); // Serve the HTML file
});

app.post('/', (req, res) => {
    const pin = req.body.pin;
    const correctPin = fs.readFileSync('src/pin.txt', 'utf8').trim();
    const result = pin === correctPin ? 'correct' : 'incorrect';

    res.json({ result: result }); // Respond with JSON
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
