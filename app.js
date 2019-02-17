const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const auth = require('./helpers/auth');

io.use(auth);
io.on('connection', client => {
  console.log("On Connect");
  client.on('event', data => {
    console.log(data);
    client.broadcast.emit('event', data);
  });
  client.on('disconnect', (e) => {
    console.log(e);
  });
});
server.listen(4000, () => {
  console.log("Listening on  4000");
});
