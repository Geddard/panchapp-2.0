var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    app.use(require('connect-livereload')({port: 35680}));
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, function(){
    console.log('Started listening on port', port);
});
