const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
  console.log('onConnect');
  client.on('event', data => {
    console.log(data);
    client.broadcast.emit('event', data);
  });
  client.on('disconnect', (e) => {
    console.log(e);
  });
});
server.listen(4000);
