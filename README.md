# How to works that sh*t RabbitMQ


## What is RabbitMQ

- Basicly RabbitMQ is a queue manage system. For example There is a register form and You wanna verify email after customer registered it. Normaly when the customer clicked the button Mail will be work on background after clicking. it seems normal right? but If the there are 1000 customers and they clicked the button for registering by the same time, what would be that time? That's why We can use RabbitMQ for this solving. without keeping customer waiting it add queue and after that I delete the queue after the work is done, it deletes.

## rabbitmqConnection.js

- There is a connection rabbitMQ.
```bash

const amqp = require('amqplib')

module.exports = async () =>{
    const connection = await amqp.connect();
    return connection;
}

```

## publisher.js

- It sends a queue what you wanna send inside queue

```bash
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
```

## consume.js

- Finally that consume to queue so It get whatever inside queue and we should delete the queue with act() function

```bash
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
```



