const amqp = require('amqplib')
const WebSocket = require('ws')

const { queue } = require('./constant')

const init = async () => {
  const server = new WebSocket.Server({ port: 3000 })

  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertQueue(queue, {
    durable: true,
  })

  server.on('connection', (socket) => {
    console.log('Client connected')

    channel.consume(
      queue,
      (message) => {
        socket.send(message.content.toString())
      },
      { noAck: true }
    )
  })

  console.log('WebSocket server is running on port 3000')
}

init()
