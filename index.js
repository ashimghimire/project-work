
const express = require('express');
const session = require("express-session");
const app = express();
const {createServer}=require('http');
const cors= require('cors');
const {key}=require('./encryption/config');
const helmet =require("helmet");
const cookie=require('cookie');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const rbacMiddleware = require('./middleware/rbacMiddleware');
const authController=require("./controller/authController");
const passport= require("./middleware/passport");
const jwt = require('jsonwebtoken');
const socket = require('socket.io');
const {decrypt,generateKey,encrypt} =require('./encryption/Encryption');

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(session({
  secret: 'simba-1',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.session());
app.use('/tasks', passport.authenticate('jwt', { session: false }), rbacMiddleware.checkRole('admin'), tasksRoutes);
app.post('/register', authController.registerUser);

function generateToken(user) {
  return jwt.sign({ sub: user.id }, 'simba-1', { expiresIn: '1h' });
}

// Login route
app.post('/login', passport.authenticate('local'), (req, res) => {
  const token = generateToken(req.user);
  // res.cookie('currentSessionKey',generateKey());
  console.log("Sad list list");
  res.json({ token });
});

const server = createServer(app);


const io = socket(server,{cors: {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE",]}});

io.on('connection', (socket) => {

  socket.on('chat_message', async (msg) => {
    let result;
    try {
      // decrypt
      result = decrypt(key,msg);
      console.log(result);
      
    } catch (e) {
      // TODO handle the failure
      return;
    }

    try{
      let message=encrypt(result, key);
      io.emit('chat_message', message);
    }catch(e){
      return;
    }
  });
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});




