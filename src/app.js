const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'screens'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

module.exports = {
    app
}