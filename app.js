var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var listener = app.listen(3030,()=>{
    console.log('Server running on localhost:' + listener.address().port);
})