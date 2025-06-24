const dotenv = require('dotenv');

// Ensure environment variables are loaded.
// server.js typically loads this first, but this provides a fallback
// if other modules import this config directly.
if (process.env.NODE_ENV !== 'production') { // Example: load .env only in non-production
    dotenv.config({ path: require('path').resolve(__dirname, '../.env') });
}

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientURL: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
};
