const db = require('../firebase/firebaseDatabase').db;
const Boom = require('@hapi/boom');

//TODO check when adding song, if song uri exists already. if so, add vote.
//TODO add logic for each call to check if snapshot value exists, since it will not error out otherwise
//TODO cleanup and order
//TODO move all error messages to a config file, and try to consolidate them better

function createSession(userId, songQueue) {
    return new Promise((resolve, reject) => {
        const sessionId = `session_${userId}`;
        getSession(userId).then((value) => {
            return reject("Session already exists")
        }).catch(() => {
            db.ref(`active_sessions/session_${userId}/users`).child(userId).set({
                userId,
                admin: true,
                votes: 5,
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
                return reject(Boom.boomify(error, {message: "An error occurred when trying to create a session"}))
            })
        });
    })
}

function getSessions() {
    return new Promise(((resolve, reject) => {
        db.ref(`active_sessions`).once('value', (snapshot) => {
            return (resolve(snapshot.val()));
        }).catch((error) => {
            return reject(Boom.boomify(error, {statusCode: 500, message: "An error occurred when trying to get sessions"}))
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
            return reject(Boom.boomify(error, {statusCode: 500, message: `A problem occurred when searching for the session ${sessionId}`}))
        })
    })
}

function getSessionSongs(sessionId){
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/songQueue`).once( 'value', (snapshot) => {
                if (snapshot.val()){
                    return resolve(snapshot.val());}
                else {
                    return resolve("The song queue is empty")}
            }).catch((error) => {
                return reject(Boom.boomify(error, {statusCode: 500, message: `A problem occurred when getting the songs for ${sessionId}`}))
            })
        })
    })
}
function getUsersFromSession(sessionId){
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/users`).once( 'value', (snapshot) => {
                if (snapshot.val()){
                    return resolve(snapshot.val());}
                else {
                    return resolve("The session has no users")}
            }).catch((error) => {
                return reject(Boom.boomify(error, {statusCode: 500, message: `A problem occurred when getting the users for ${sessionId}`}))
            })
        })
    })
}

function deleteSession(sessionId) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}`)
                .remove((error) => {
                    if (error) {
                        return reject(Boom.boomify(error, {statusCode: 500, message: "A problem occurred when trying to delete the session"}))
                    } else {
                        return resolve("Session successfully removed")
                    }
                })
        }).catch((error) => {
            return reject(error, {message: "An error occurred when trying to delete the session"})
        })
    })
}

function deleteSessionUser(sessionId, userId) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/users/${userId}`).once('value', (snapshot) => {
                if (snapshot) {
                    db.ref(`active_sessions/${sessionId}/users/${userId}`).remove((error) => {
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
            return reject(Boom.boomify(error, {message: `An error occurred when trying to delete ${userId} from the session`}))
        });
    })
}

function addSongToQueue(sessionId, song) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/songQueue`).child(song.uri).set(song, (error) => {
                if (error) {
                    return reject(Boom.boomify(error, {message: "A problem occured when adding a song to the queue"}))
                } else {
                    return resolve(`successfully added ${song.title} to the queue`)
                }
            })
        }).catch((error) => {
            return reject(Boom.boomify(error));
        });
    })
}

function addUserToSession(sessionId, userId) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/users`).child(userId).set({userId}, (error) => {
                if (error) {
                    return reject(Boom.boomify(error, {message: "An error occurred when adding user to session"}));
                } else {
                    return resolve(`User ${userId} added to session ${sessionId}`)
                }
            }).catch((error) => {
                return reject(Boom.boomify(error,{message: "An error occurred when adding user to session"}))
            })
        })
    })
}

function deleteSongFromQueue(sessionId, songURI) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/songQueue/${songURI}`).once('value', (snapshot) => {
                if (snapshot.val()){
                    db.ref(`active_sessions/${sessionId}/songQueue/${songURI}`).remove((error) => {
                        if (error) {
                            return reject(Boom.boomify(error, {message: "An error occurred when deleting a song from the queue"}))
                        } else {
                            return resolve(`successfully removed ${songURI} from the queue`)
                        }
                    })
                }
                else return reject(Boom.notFound("Song not found in queue"))
            });
        }).catch((error) => {
            return reject(Boom.boomify(error, {message: "An error occurred when deleting a song from the queue"}));
        });
})
}

function addVoteToSong(sessionId, songURI) {
    return new Promise((resolve, reject) => {
        getSession(sessionId).then(() => {
            db.ref(`active_sessions/${sessionId}/songQueue/${songURI}`).once('value', (snapshot) => {
                if (snapshot.val()){
                    const newVotes = snapshot.val().votes + 1 || 1;
                    db.ref(`active_sessions/${sessionId}/songQueue/${songURI}`).child("votes").set(newVotes, (error) => {
                        if (error){
                            return reject(Boom.badGateway("An error occurred when trying to add a vote to a song"))
                        }
                        else return resolve(`Successfully added a vote to ${songURI}`)
                    })
                }
                else return reject(Boom.notFound("Cannot add vote, song not found in queue"))
            });
        }).catch((error) => {
            return reject(Boom.boomify(error, {message: "An error occurred when adding a vote to a song"}));
        });
    })
}


module.exports = {
    createSession,
    deleteSession,
    deleteSessionUser,
    deleteSongFromQueue,
    getSession,
    getSessions,
    addSongToQueue,
    addUserToSession,
    addVoteToSong,
    getSessionSongs,
    getUsersFromSession,
};
