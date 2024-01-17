const amqp = require('amqplib')
const readline = require('readline')

const { queue } = require('./constant')

const askQuestion = (channel, connection) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Send Notification: ', async (answer) => {
    await channel.sendToQueue(queue, Buffer.from(answer))

    console.log('--- Notification sent ---')
    console.log('')

    rl.close()

    askQuestion(channel, connection)
  })
}

const init = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertQueue(queue, {
    durable: true,
  })

  askQuestion(channel, connection)
}

init()
