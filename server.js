import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/CMS_database')
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((error) => {
    console.log(error);
  });

// Schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  items: { type: String, required: true },
  credit: { type: String, required: true },
  paidAmt: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Create user
app.post('/createuser', async (req, res) => {
  try {
    const user = new User(req.body);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// Read all users
app.get('/readalluser', async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// Read user by ID
app.get('/read/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// Update user
app.put('/updateuser/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// Delete user
app.delete('/delete/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello from the backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
