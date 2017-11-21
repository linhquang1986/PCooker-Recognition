var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/management', (req, res) => {
    res.render('management');
})
var listener = app.listen(3030, () => {
    console.log('Server running on localhost:' + listener.address().port);
})