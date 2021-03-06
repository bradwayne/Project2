let db = require('../app/models');

module.exports = function (app) {

    // api routes
    // a get request api to get data from the project2_DB user database
    app.get('/users', function (req, res) {
        db.users.findAll({}).then(function (users) {
            res.json(users);
        });
    });

    // a get request api to get data from the project2_DB sport database
    app.get('/sports', function (req, res) {
        db.sports.findAll({}).then(function (sports) {
            res.json(sports);
        });
    });

    // a get request api to get data from the project2_DB event database
    app.get('/events', function (req, res) {
        db.events.findAll({}).then(function (events) {
            res.json(events);
        });
    });

    // event discussion (blog) api's

    // a get request api to get all mysql database entries
    //           for event discussion for any event
    app.get('/eventdiscussions', function (req, res) {
        db.EventDiscussion.findAll({})
            .then(function (dbDiscussion) {
                res.json(dbDiscussion);
            });
    });

    // a get request api to get mysql database entries
    //        for event discussion for an event
    app.get('/eventdiscussions/:EventId', function (req, res) {
        db.EventDiscussion.findAll({
            where: {
                EventId: req.params.EventId
            }
        })
            .then(function (dbDiscussion) {
                res.json(dbDiscussion);
            });
    });

    // a post request api to add an event discussion (blog) to an event
    app.post('/api/eventdiscussions/:EventId', function (req, res) {
        console.log('here');
        db.EventDiscussion.create({
            message: req.body.message,
            EventId: req.body.EventId,
            UserId: req.body.UserId
        })
            .then(function (dbBlog) {
                res.json(dbBlog);
                res.status(200).end();
            });
    });

    // DELETE route for deleting blogs (event discussions)
    app.delete('/api/eventdiscussions/:EventId/:UserId', function (req, res) {
        db.EventDiscussion.destroy({
            where: {
                EventId: req.params.EventId,
                UserId: req.params.UserId,
                id: req.body.Id
            }
        })
            .then(function (dbBlog) {
                res.json(dbBlog);
                res.status(200).end();
            });
    });

    // PUT route for updating blogs (event discussions)
    app.put('/api/eventdiscussions/:EventId', function (req, res) {
        db.EventDiscussion.update(req.body,
            {
                where: {
                    EventId: req.params.EventId,
                    UserId: req.body.UserId
                }
            })
            .then(function (dbBlog) {
                if (dbBlog.changedRows === 0) {
                    return res.status(404).end();
                }else {
                    res.json(dbBlog);
                    res.status(200).end();
                }
            });
    });
};
