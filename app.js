const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const auth = require('./helpers/auth');
const port = process.env.PORT || 4000

app.use('/healthz', function (req, res) {
  console.log("On Check");
  res.status(200).send('Health Check')
})

io.use(auth);
io.on('connection', client => {
  console.log("On Connect");
  let query = client.handshake.query
  let room = query.room
  client.join(room)
  client.on('event', data => {
    client.broadcast.to(room).emit('event', data);
  });
  resetConnectedUsers(io, room)

  client.on('disconnect', (e) => {
    resetConnectedUsers(io, room)
    console.log(e);
  });
});

function resetConnectedUsers(io, room) {
  let users = [];
  io.of('/').in(room).clients((err, clients) => {
    clients.map(function (clientId) {
      let client = io.sockets.connected[clientId]
      if (client != null) {
        let user = client.handshake.query.user
        users.push(user)
      }
    });
    io.of('/').in(room).emit('users', users);
  });
}

server.listen(port, () => {
  console.log("Listening on " + port);
});
