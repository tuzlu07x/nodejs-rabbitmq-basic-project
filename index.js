const express = require('express')
const app = express()
const port = 3000
const emailPublisher = require('./publisher');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('It works!')
})

app.post('/register', async (req, res) => {
    const { email } = req.body;
    await emailPublisher(email);
   res.status(200).json({ msg: 'You registered successfully you will get a mail soon...' })

    // setTimeout(()=>{
    // res.status(200).json({ email: email, date: Date.now() })
    // },10000)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})