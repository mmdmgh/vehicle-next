// testConnection.js
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://mmdmgh16:5KH7VrNbZ2hqFHdz@cluster0.cjbbmrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
