const sessions = require('../firebase/sessions');
const usersUtil = require('../utilities/usersUtil');
const songQueueUtil = require("../utilities/songQueueUtil");

function fakeHttpRequestCreateSession(userId, songQueue) {
    //TODO make asycnronous for callback with error
    if (!usersUtil.userExists(userId) && songQueueUtil.isSongQueue(songQueue))
        sessions.createSession(userId, songQueue);
    else (
        //TODO return error
        console.log("An error occured when trying to create a session")
    )
}
module.exports = {
    fakeHttpRequestCreateSession
};


