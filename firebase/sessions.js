const db = require('./firebaseDatabase').db;

// TODO make all requests return actual https errors and responses. ie 404
function createSession(userId, songQueue) {
    return new Promise((resolve, reject) => {
        sessionExists(userId).then((value) => {
            return reject(value)
        }).catch(() => {
            db.ref(`active_sessions/session_${userId}`).set({
                songQueue: songQueue,
                users: [
                    userId
                ],
            }, (Error) => {
                if (Error) {
                    return reject("Session not created")
                } else {
                    return resolve("Session created")
                }
            })
        });
    })
}

function removeSession(userId) {
    return new Promise((resolve, reject) => {
        sessionExists(userId).then(() => {
            db.ref(`active_sessions/session_${userId}`)
                .remove((Error) => {
                    if (Error) {
                        return reject("Unable to remove session")
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

function sessionExists(userId) {
    return new Promise((resolve, reject) => {
        db.ref(`active_sessions/`).once('value', (snapshot) => {
            if (snapshot.hasChild(`session_${userId}`)) {
                return resolve("Session exists")
            } else {
                return reject("Session does not exist")
            }
        })
    })
}
function removeUserFromSession(sessionId, userId){
    return new Promise((resolve, reject) => {
        //TODO database query to remove user
    })
}

function addSongToQueue(sessionId, song){
    return new Promise((resolve, reject) => {
        //TODO database query to add to queue
    })
}

function deleteSongFromQueue(sessionId, song){
    return new Promise((resolve, reject) => {
        //TODO database query to delete from queue
    })
}

function addVoteToSong(sessionId, song){
    return new Promise((resolve, reject) => {
        //TODO database query to delete from queue
    })
}



module.exports = {
    createSession,
    removeSession,
    sessionExists,
};
