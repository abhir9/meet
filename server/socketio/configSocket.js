function configSocket (server, app) {
  const io = require('socket.io').listen(server)
  app.locals.io = io
  io.on('connection', (socket) => {
    socket.on('newVote', (data) => {
    })
  })
}

module.exports = configSocket
