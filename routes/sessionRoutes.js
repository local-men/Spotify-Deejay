const express = require('express');
const sessions = require('../controllers/sessionsController');
const router = express.Router();
const schemas = require('../schemas/schemas');
const validator = require('express-joi-validation').createValidator({});

//TODO rethink route names/parameters
//TODO add validator and schema for each route.
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
router.get('/:sessionId/songs', async(request, response) => {
    try {
        const success = await sessions.getSessionSongs(request.params.sessionId);
        response.send(success);
    } catch (e){
        response.send(e)
    }
});
router.get('/:sessionId/users', async(request, response) => {
    try {
        const success = await sessions.getUsersFromSession(request.params.sessionId);
        response.send(success);
    } catch (e){
        response.send(e)
    }
});

// ALL POST ROUTES
router.post('/', validator.body(schemas.sessionSchema), async (request, response) => {
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
router.delete('/:sessionId/songs/:songURI', async (request, response) => {
    const sessionId = request.params.sessionId;
    const songURI = request.params.songURI;
    try{
        const success = await sessions.deleteSongFromQueue(sessionId, songURI);
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
router.patch('/:sessionId/users/add', validator.body(schemas.userSchema), async (request, response) => {
    const sessionId = request.params.sessionId;
    const userId = request.body.user.userId;
    try{
        const success = await sessions.addUserToSession(sessionId, userId);
        response.send(success)
    }catch (e) {
        response.send(e)
    }
});
router.patch('/:sessionId/songs/votes', async (request, response) => {
    const sessionId = request.params.sessionId;
    const songURI = request.body.song.uri;
    try{
        const success = await sessions.addVoteToSong(sessionId, songURI);
        response.send(success)
    }catch (e) {
        response.send(e)
    }
});
router.patch('/:sessionId/songs/add', validator.body(schemas.songSchema), async (request, response) => {
    const sessionId = request.params.sessionId;
    const song = request.body.song;
    try{
        const success = await sessions.addSongToQueue(sessionId, song);
        response.send(success)
    }catch (e) {
        response.send(e)
    }
});
module.exports = router;