const User = require('../models/user');

exports.registerUser = (req, res, next) => {
  const { username, password, role } = req.body;
 
  User.register({ username, password, role }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    if(user)
    res.json({ message: 'User registered successfully',user});
  });

};

exports.loginUser = (req, res) => {

    const { username, password } = req.body;
  
    User.authenticate(username, password, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create a new session and store user id
      req.session.userId = user._id; 
      
      res.json({ message: 'Login successful' });
  
    });
  
  };
  