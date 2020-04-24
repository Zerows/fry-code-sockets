const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const auth = require('./helpers/auth');
const port = process.env.PORT || 4000

io.use(auth);
io.on('connection', client => {
  console.log("On Connect");
  let room = client.handshake.query.room
  client.join(room)
  client.on('event', data => {
    client.broadcast.to(room).emit('event', data);
  });
  client.on('disconnect', (e) => {
    console.log(e);
  });
});
server.listen(port, () => {
  console.log("Listening on " + port);
});
