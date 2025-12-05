const path = require('path');

const express = require("express");

const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api')

const app = express();

// CORS configuration - allows requests from localhost and production frontend
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL // Your Vercel frontend URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1 && !process.env.NODE_ENV === 'development') {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(morgan('combined'))

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/v1', api);
 


app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;
