const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Here are the users you asked for")
});

module.exports = router;