// Node.js API route

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://madhukoppu10:madhukoppu10@cluster0.06nxwhe.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(MONGO_URI);
app.get('/', (req, res) => res.json("Welcome"));
app.post('/contact', async (req, res) => {

  try {
    await client.connect();
    
    const db = client.db('mydatabase');
    
    const email = req.body.email;
    const subject = req.body.subject
    
    await db.collection('emails').insertOne({
      email: email,
      subject: subject,
      date: new Date() 
    });

    res.status(201).json({ message: 'Email Sent'});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving email'});
  } finally {
    await client.close();
  }

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
