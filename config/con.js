const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ict:Mihza%40143@cluster0.skcqy.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.on('connected', () => console.log('connected'));

exports.mongoose=mongoose;