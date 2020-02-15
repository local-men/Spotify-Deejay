const db = require('./firebaseDatabase').db;
const Boom = require('@hapi/boom');

function createSession(userId, songQueue) {
    return new Promise((resolve, reject) => {
        getSession(userId).then((value) => {
            return reject("Session already exists")
        }).catch(() => {
            db.ref(`active_sessions/session_${userId}`).set({
                songQueue: songQueue,
                users: [
                    userId
                ],
            }, (error) => {
                if (error) {
                    return reject(Boom.boomify(error))
                } else {
                    return resolve("Session created")
                }
            })
        });
    })
}

function getSessions() {
    return new Promise(((resolve, reject) => {
        db.ref(`active_sessions`).once('value', (snapshot) => {
            return (resolve(snapshot.val()));
        }).catch((error) => {
            return reject(Boom.boomify(error, {statusCode: 500}))
        })
    }))
}

function getSession(sessionId) {
    return new Promise((resolve, reject) => {
        db.ref(`active_sessions/${sessionId}`).once('value', (snapshot) => {
            if (snapshot.val()){
                return resolve(snapshot.val())
            }
            else {
                return reject(Boom.notFound(`Could not find session ${sessionId}`))
            }
        }).catch((error) => {
            return reject(Boom.boomify(error, {statusCode: 500}))
        })
    })
}

function removeSession(userId) {
    return new Promise((resolve, reject) => {
        getSession(userId).then(() => {
            db.ref(`active_sessions/session_${userId}`)
                .remove((error) => {
                    if (error) {
                        return reject(Boom.boomify(error, {statusCode: 500}))
                    } else {
                        return resolve("Session successfully removed")
                    }
                }).then(() => {
                return resolve("Session successfully removed")
            })
        }).catch((error) => {
            return reject(error)
        })
    })
}

function removeUserFromSession(sessionId, userId) {
    return new Promise((resolve, reject) => {
        //TODO database query to remove user
    })
}

function addSongToQueue(sessionId, song) {
    return new Promise((resolve, reject) => {
        //TODO database query to add to queue
    })
}

function deleteSongFromQueue(sessionId, song) {
    return new Promise((resolve, reject) => {
        //TODO database query to delete from queue
    })
}

function addVoteToSong(sessionId, song) {
    return new Promise((resolve, reject) => {
        //TODO database query to delete from queue
    })
}


module.exports = {
    createSession,
    removeSession,
    getSession,
    getSessions,
};
