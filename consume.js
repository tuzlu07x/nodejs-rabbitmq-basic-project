const amqp = require('amqplib');
const rabbitMqConnection = require('./rabbitmqConnection');
const queueName = 'emailQueueName';


async function onConsumeEmail(){
    const connection = await rabbitMqConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (email)=>{
        setTimeout(()=>{
            const mail = JSON.parse(email.content.toString());
            console.log(`Email went successfully ${mail.email}`);
            channel.ack(email);
        },10000)
    })
}

onConsumeEmail();