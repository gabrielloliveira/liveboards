const express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const PORT = parseInt(process.env.PORT) || 3000

http.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('drawend', (msg) => {
    socket.broadcast.emit('newdraw', msg);
  });
});