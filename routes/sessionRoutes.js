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
        response.send(success);
    }catch (e) {
        response.send(e)
    }
});

// ALL DELETE ROUTES
router.delete('/:sessionId', async (request, response) => {
    const sessionId = request.params.sessionId;
    try{
        const success = await sessions.deleteSession(sessionId);
        response.send(success)
    }catch (e) {
        response.send(e)
    }
});
router.delete('/:sessionId/:userId', async (request, response) => {
    const sessionId = request.params.sessionId;
    const userId = request.params.userId;
    try{
        const success = await sessions.deleteSessionUser(sessionId, userId);
        response.send(success)
    }catch (e) {
        response.send(e)
    }
});

// ALL PATCH ROUTES

module.exports = router;