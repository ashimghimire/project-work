
const {mongoose} = require('../config/con');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  jwt: String,
});

// Register a new user
userSchema.statics.register = async function (userData,callback) {
  const { username, password, role } = userData;
  console.log(username);
  try {
    // Check if the username already exists
    const existingUser = await this.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Create a new user instance
    const newUser = new this({
      username,
      password, // You should hash and salt the password before saving it
      role, // Optional: Set the user's role (e.g., 'admin', 'user')
      // Other properties (e.g., firstName, lastName, address) can be added here
    });

    // Save the user to the database
    const registeredUser=await newUser.save();

    // Optionally, generate a JWT token and return it
    // (You can use your existing JWT logic here)
    callback(null,registeredUser);
    // return { message: 'User registered successfully' };
  } catch (error) {
    callback(error,null);
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;