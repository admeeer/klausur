const express = require('express');
const session = require('express-session')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json()); // Update for JSON parsing
app.use('/static', express.static('src/static'));
app.use('/scripts/', express.static('src/scripts'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html'); // Serve the HTML file
});

app.post('/check-teacher-pin', (req, res) => {
    const input_pin = req.body.pin;
    const actual_pin = fs.readFileSync('src/pin.txt', 'utf8').trim();
    if(input_pin == actual_pin) {
        req.session.isAuthenticated
        res.send({ success: true });
    } else {
        res.send({ success: false});
    }


});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
