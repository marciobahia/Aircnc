const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://marciobahia:2989395@airbnb-cpinl.mongodb.net/airbnb?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
   
})

const connectedUsers = {}; 

io.on('connection', socket => {
  
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
req.io = io;
req.connectedUsers = connectedUsers;

return next ();
})
 
// GET, POST, PUT, DELETE

// req.query = Acessar Query Params (para Filtros)
// req.params = Acessar Route params (para edição e Delete)
// req.body = Acessar corpo da requisição (para Criação e Edição)
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


server.listen(3333);
 
    