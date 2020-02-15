const db = require('./firebaseDatabase').db;
const Boom = require('@hapi/boom');

function createSession(userId, songQueue) {
    return new Promise((resolve, reject) => {
        const sessionId = `session_${userId}`;
        getSession(userId).then((value) => {
            return reject("Session already exists")
        }).catch(() => {
            db.ref(`active_sessions/session_${userId}/users`).child(userId).set({
                userId
            }, (error) => {
                if (error) {
                    return reject(Boom.boomify(error))
                } else {
                    return resolve("Session created")
                }
            }).then(() => {

            }).then(() => {
                songQueue.forEach((song) => {
                    addSongToQueue(sessionId, song)
                })
            }).catch((error) => {
                return reject(Boom.boomify(error))
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
            if (snapshot.val()) {
                return resolve(snapshot.val())
            } else {
                return reject(Boom.notFound(`Could not find session ${sessionId}`))
            }
        }).catch((error) => {
            return reject(Boom.boomify(error, {statusCode: 500}))
        })
    })
}

function deleteSession(sessionId) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}`)
                .remove((error) => {
                    if (error) {
                        return reject(Boom.boomify(error, {statusCode: 500}))
                    } else {
                        return resolve("Session successfully removed")
                    }
                })
        }).catch((error) => {
            return reject(error)
        })
    })
}

function deleteSessionUser(sessionId, userId) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/users/${userId}`).once('value', (snapshot) => {
                if (snapshot) {
                    db.ref(`active_sessions/${sessionId}/users`).remove((error) => {
                        if (error) {
                            return reject(Boom.notFound(`Could not find user ${userId}`))
                        } else {
                            return resolve(`successfully removed ${userId} from the session`)
                        }
                    })
                } else {
                    return reject(Boom.notFound("User not in session"))
                }
            });
        }).catch((error) => {
            return reject(Boom.boomify(error))
        });
    })
}

/*
Adds a new song to the queue, using the URI as its key value
 */
function addSongToQueue(sessionId, song) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/songQueue`).child(song.uri).set(song, (error) => {
                if (error) {
                    return reject(Boom.boomify(error))
                } else {
                    return resolve(`successfully added ${song} to the queue`)
                }
            })
        }).catch((error) => {
            return reject(Boom.boomify(error));
        });
    })
}

function addUserToSession(sessionId, userId) {
    return new Promise((resolve, reject) => {
        //TODO add a user to session
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
    deleteSession,
    deleteSessionUser,
    getSession,
    getSessions,
};
