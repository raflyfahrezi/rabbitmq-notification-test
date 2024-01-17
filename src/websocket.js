const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 })

server.on('connection', (socket) => {
  console.log('Client connected')

  // Send a welcome message to the client
  socket.send('Welcome to the WebSocket server!')

  // Listen for messages from the client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`)

    // Send a response back to the client
    socket.send(`You sent: ${message}`)
  })

  // Listen for socket closure
  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('WebSocket server is running on port 3000')
