const express = require('express');
const sessions = require('../firebase/sessions');
const router = express.Router();
const Boom = require('@hapi/boom');

// ALL GET ROUTES
router.get('/', async (request, response) => {
    try {
        const returnedSessions = await sessions.getSessions();
        response.send(returnedSessions)
    }catch (e) {
        response.send(e)
    }
});
router.get('/:sessionId', async (request, response) => {
    try {
        const returnedSession = await sessions.getSession(request.params.sessionId);
        response.send(returnedSession)
    }catch (e) {
        response.send(e)
    }
});

// ALL POST ROUTES
router.post('/', async (request, response) => {
    const userId = request.body.userId;
    const songQueue = request.body.songQueue;
    try{
        const success = await sessions.createSession(userId, songQueue);
        response.send({message: success});
    }catch (e) {
        response.send(e)
    }
});

// ALL DELETE ROUTES
router.delete('/', async (request, response) => {
    const userId = request.body.userId;
    try{
        const success = await sessions.removeSession(userId);
        response.send({message: success})
    }catch (e) {
        response.send(e)
    }
});

// ALL PATCH ROUTES

module.exports = router;