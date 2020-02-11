const express = require('express');
const sessions = require('../firebase/sessions');
const router = express.Router();

router.get('/', (request, response) => {
    response.send("Here are the sessions you asked for")
});

router.post('/', async (request, response) => {
   //TODO call logic to determine if everything is formatted properly
    const userId = request.body.userId;
    const songQueue = request.body.songQueue;
    try{
        const success = await sessions.createSession(userId, songQueue);
        response.json({message: success});
    }catch (e) {
        response.json({message: e})
    }
});

router.delete('/', async (request, response) => {
    //TODO make logic to determine if real userID
    const userId = request.body.userId;
    try{
        const success = await sessions.removeSession(userId);
        response.json({message: success})
    }catch (e) {
        response.json({message: e})
    }
});

module.exports = router;