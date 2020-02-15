const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); // maked this api open!

app.get('/', (req, res) => {
    res.send("we are on home!")
});

// MIDDLEWARE FOR ROUTES
//redirects all /sessions
const sessionRoute = require('./routes/sessionRoutes');
app.use('/sessions', sessionRoute);
const usersRoute = require('./routes/userRoutes');
app.use('/users', usersRoute);


// Listens on port 3000
app.listen(3000);

module.exports = app;
