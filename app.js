const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Mongodb connection
const db = require('./configs/mongodb');
db.connect();

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors);

// Socket.io
// ...

// Routers
// ...

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
