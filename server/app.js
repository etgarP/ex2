const express = require('express'); 
var app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors'); 
app.use(cors());

const customEnv = require('custom-env'); 
customEnv.env(process.env.NODE_ENV, './config'); 
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static('public'))

const Chats = require('./routes/Chats')
app.use('/api/Chats', Chats);
const Users = require('./routes/Users')
app.use('/api/Users', Users);
const Tokens = require('./routes/Tokens')
app.use('/api/Tokens', Tokens);

app.listen(process.env.PORT)