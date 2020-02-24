module.exports = function(app){
    app.get('/', (req, res) => {
        res.send("we are on home!")
    });
    const sessionRoute = require('./routes/sessionRoutes');
    app.use('/sessions', sessionRoute);
    const usersRoute = require('./routes/userRoutes');
    app.use('/users', usersRoute);
};




