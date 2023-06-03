// todo before
// const express = require('express'); 
// var app = express();

// const bodyParser = require('body-parser'); 
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// const cors = require('cors'); 
// app.use(cors());

// const customEnv = require('custom-env'); 
// customEnv.env(process.env.NODE_ENV, './config'); 
// console.log(process.env.CONNECTION_STRING)
// console.log(process.env.PORT)

// const mongoose = require('mongoose')
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// app.use(express.static('public'))

// const Chats = require('./routes/Chats')
// app.use('/api/Chats', Chats);
// const Users = require('./routes/Users')
// app.use('/api/Users', Users);
// const Tokens = require('./routes/Tokens')
// app.use('/api/Tokens', Tokens);

// app.listen(process.env.PORT)

// todo after

const express = require('express'); 
const bodyParser = require('body-parser'); 
var app = express();
const http = require('http')
const cors = require('cors'); 
const customEnv = require('custom-env'); 
const mongoose = require('mongoose')

const server = http.createServer(app)
const { Server } = require("socket.io")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

customEnv.env(process.env.NODE_ENV, './config'); 
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    }
})


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

// io.use(cors())

io.on('connection', (socket) => {
    console.log("the socket id is", socket.id)
    socket.on('msg', (msg)=>{
        console.log(msg)
        socket.emit('client log','ooooo' + msg)
    })
    socket.on('id', (id)=>{
        socket.broadcast.emit('id',id)
    })
    socket.on('disconnect', ()=>{
        console.log('disconntected')
    })
})

server.listen(process.env.PORT,()=>{

    console.log(`app is listening on poort ${process.env.PORT}`);
})

// app.listen(process.env.PORT)