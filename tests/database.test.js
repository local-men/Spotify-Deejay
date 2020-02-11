const db = require('../firebase/firebaseDatabase').db;

const sessions = require('../firebase/sessions');
const testUserId = "user_13241234";
const testSongQueue = [
    {
        songURI: "uri_12523dfsdf",
        songVotes: 3
    },
    {
        songURI: "uri_125sdsdfg3dfsdf",
        songVotes: 5
    },
    {
        songURI: "uri_1sdfgsdf2523dfsdf",
        songVotes: 1
    }
];
describe("Testing database sessions", () => {
    test('A session was created on the database', () => {
        return sessions.createSession(testUserId, testSongQueue).then(data => {
            expect(data).toBe("Session created");
        }).catch((error) => {
            console.log(error);
        });
    });
    test('A session exists in the database', () => {
        return sessions.sessionExists(testUserId).then(data => {
            expect(data).toBe("Session exists");
        }).catch((error) => {
            console.log(error);
        });
    });
    test('A session was deleted from the database', () => {
        return sessions.removeSession(testUserId).then(data => {
            expect(data).toBe("Session successfully removed");
        }).catch((error) => {
            console.log(error);
        });
    });
});

//Firebase is shit and the connection needs to be closed after all tests
afterAll(() => {
    db.goOffline();
});