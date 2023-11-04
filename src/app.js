const express = require("express");
const path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'screens'));

app.get('/', function(_, res) {
    res.render('index');
});

app.get('/match/:roomid', function(req, res) {
    const { roomid } = req.params
    res.render('dice-game');
});

module.exports = {
    app
}