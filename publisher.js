const amqp = require('amqplib');
const rabbitMqConnection = require('./rabbitmqConnection');
const queueName = 'emailQueueName';

module.exports = async (email)=> {
    try {
    const connection = await rabbitMqConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify({email: email})))
    console.log('it went to queue!!!')

    }catch(error){
        console.error(`Something is wrong ${error}`)
    }
}