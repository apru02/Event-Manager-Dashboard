const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace 'your_mongodb_uri' with your actual MongoDB connection string
    const mongodbURI = 'mongodb://localhost:27017/Event_manager';

    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with an error
  }
};

module.exports = connectDB;
