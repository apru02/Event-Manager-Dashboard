const mongoose = require('mongoose');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connectDB = async () => {
  try {
    // Replace 'your_mongodb_uri' with your actual MongoDB connection string
    const mongodbURI = process.env.MONGO_URI;


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
