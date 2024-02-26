const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json()); // Update for JSON parsing
app.use('/static', express.static('src/static'));
app.use('/scripts/', express.static('src/scripts'));
app.use('/quizzlers/', express.static('src/quizzlers'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


app.get('/quizzlers/list', (req, res) => {
    const directoryPath = path.join(__dirname, '/quizzlers');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log('Error getting directory information.')
        } else {
            const fileNamesWithoutExtension = files.map(file => path.parse(file).name);
            res.json(fileNamesWithoutExtension);
        }
    });
});

app.get('/quizzlers/quiz', (req, res) => {
    const quizName = req.query.name;
    const filePath = path.join(__dirname, '/quizzlers', `${quizName}.quizzler`);

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.log('Error reading quiz file.');
            res.status(500).send('Error reading quiz file.');
        } else {
            const questions = JSON.parse(data);
            res.json(questions);
        }
    });
});

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
