const express = require("express");
const path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'screens'));

app.get('/', function(req, res) {
    res.render('index');
});

module.exports = {
    app
}