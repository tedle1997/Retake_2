const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");

let models = require("../models").model;
const ObjectId = require("mongodb").ObjectId;
const eventBus = require("../ws").eventBus;

/*
Function to get state of the timer
*/
function currentState(started, duration) {
    let now = new Date().getTime();
    return now < parseInt(started) + parseInt(duration) ? "counting" : "expired";
}


/*
GET /timer/new
returns a form to create a new timer, which requires at least the following information
- title
- duration (seconds)
- sound to play when timer expires (among a predefined set) - optional, if no sound if chosen then nothing happens
*/
router.get("/new", function (req, res) {
    //TODO: decide WTF should the sound be
    res.send(`<form method="post" action="/timer" enctype="multipart/form-data">
<p><input type="text" name="title" placeholder="Title"></p>
<p><input type="number" step="1" name="duration" placeholder="Duration"></p>
<p><input type="number" name="start" placeholder="Start From"></p>
<p><input type="text" name="sound" placeholder="Sound"></p>
<p><input type="text" name="style" placeholder="Style"></p>
<p><input type="submit" value="Create new timer"></p>
</form>`);
});

/*
POST /timer
creates a new countdown timer when the form is submitted. The timer starts counting down from when it is created.
*/
router.post("/", function (req, res) {
    /*
    Timer json objects:
    - id
    - title
    - sound
    - duration (seconds)
    - started (timestamp) - set when the timer is created
    - state (counting, expired) - depending on:
    -- counting: current time < started + duration
    -- expired: current time > started + duration
    */
    if (req.body.title === undefined || req.body.duration === undefined) {
        res.status(400).end();
        return;
    }

    const now = new Date().getTime();
    const data = {
        title: req.body.title,
        sound: req.body.sound || "no_sound",
        duration: parseInt(req.body.duration),
        expires: new Date().getTime() + parseInt(req.body.duration),
        style: req.body.style || "style_2",
        started: parseInt(req.body.started) || now,
    };
    data.state = currentState(parseInt(data.started), parseInt(data.duration));

    models.timers.insertOne(data).then(() => {
        if (req.accepts("json")) {
            res.status(201).json(data);
            eventBus.emit('timer.created', data);
        } else {
            res.status(406).end();
        }
    });
});

/*
GET /timer/{id}
returns the state of the timer {id} as a JSON object which contains:
- id
- title
- sound
- duration (seconds)
- started (timestamp) - set when the timer is created
- state (counting, expired) - depending on:
-- counting: current time < started + duration
-- expired: current time > started + duration
 */
router.get("/:id", function (req, res) {
    let filter = { _id: new ObjectId(req.params.id) };
    models.timers.findOne(filter).then((result) => {
        if (!result) {
            res.status(404).end();
        } else {
            if (req.accepts("json")) {
                res.status(200).send(result);
            }
            res.status(200).end();
        }
    });
});

/*
GET /timer/{id}/edit
retrieves a form to change the title and duration of an existing timer. Submitting the form will send a
*/
router.get("/:id/edit", function (req, res) {
    let filter = { _id: new ObjectId(req.params.id) };
    models.timers.findOne(filter).then((result) => {
        if (result === undefined) {
            res.status(400).end();
        } else {
            res.send(`<form method="post" action="/timer/${req.params.id}?_method=PUT" enctype="multipart/form-data">
                        <p><input type="text" name="title" placeholder="Title" ></p>
                        <p><input type="text" name="duration" placeholder="Duration" ></p>
                        <p><input type="text" name="sound" placeholder="Sound" ></p>
                        <p><input type="text" name="style" placeholder="Style"></p>
                        <p><input type="submit" value="Update timer"></p>
                        </form>`);
        }
    });
});

/*
PUT /timer/{id}
which will also update the started timestamp to the time the PUT request was received on the server
*/
router.put("/:id", function (req, res) {
    let filter = { _id: new ObjectId(req.params.id) };

    models.timers.findOne(filter).then((result) => {
        if (result === null) {
            let data = {
                title: req.body.title,
                sound: "Default Sound",
                duration: req.body.duration,
                started: new Date().getTime(),
                expires: new Date().getTime() + parseInt(req.body.duration),
                style: req.body.style || "style_2"
            };
            data.state = currentState(parseInt(data.started), parseInt(data.duration));
            models.timers.insertOne(data).then((result) => {
                if (req.accepts("json")) {
                    res.status(201).json(data);
                    eventBus.emit("timer.created", result.value);
                } else {
                    res.status(406).end();
                }
            });
        } else {
            console.log(req);
            let edited_timer = {
                _id: result._id,
                title: req.body.title ,
                sound: req.body.sound,
                duration: req.body.duration,
                started: new Date().getTime(),
                style: req.body.style
            };
            edited_timer.expires = parseInt(edited_timer.started)+parseInt(edited_timer.duration);
            edited_timer.state = currentState(parseInt(edited_timer.started), parseInt(edited_timer.duration));
            models.timers.replaceOne(filter, edited_timer, { upsert: false }).then((result) => {
                eventBus.emit("timer.edited", result.value);
                res.status(200).end();
            });
        }
    });
});

/*
DELETE /timer/{id}
cancels the timer and removes it from the database
*/
router.delete("/:id", function (req, res) {
    let filter = { _id: new ObjectId(req.params.id) };
    models.timers.findOneAndDelete(filter).then((result) => {
        if (result.value !== null) {
            res.status(204).end();
            eventBus.emit("timer.deleted", result.value);
        } else {
            res.status(404).end();
        }
    });
});

/*
GET /timer
update all states of every timers in the database
*/
router.get("/", function (req, res) {
    let filter = {};

    if (req.query.search) {
        filter = {
            $or: [{ "title": { $regex: req.query.search } },
                { "sound": { $regex: req.query.search } },
                { "duration" : { $regex: req.query.search }},
                { "started" : { $regex: req.query.search }},
                { "expires" : { $regex: req.query.search }},
            ]
        };

    }

    models.timers.find(filter).toArray().then(result => {
       let model = {
           Timers: result,
           title: "Timer Wall"
       };
        if (req.accepts("html")) {
            res.render("timers", model);
        }
        else if (req.accepts("json")) {
            res.json(result);
        } else {
            res.status(406).end(); //not acceptable
        }
    });
});


/*
POST /timer/:id/pause
Pause a timer
The event bus will signal the pause, database record when was the pause signalled.
*/
router.post("/:id/pause",function(req,res){
    let filter = { _id: new ObjectId(req.params.id) };

    models.timers.findOne(filter).then((result) => {
        if(result!==null){
            let updated_timer = {
                _id: result._id,
                title: result.title,
                sound: result.sound,
                duration: parseInt(result.expires) - new Date().getTime(),
                started: new Date().getTime(),
                expires: parseInt(result.expires),
                state: "paused",
                style: result.style,
            };
            models.timers.replaceOne(filter, updated_timer, { upsert: false }).then((result) => {
                eventBus.emit("timer.paused", result.ops[0]);
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    })
})

/*
POST /timer/:id/resume
Resume a timer
Change the timer duration to duration + paused duration
*/
router.post("/:id/resume",function(req,res){
    let filter = { _id: new ObjectId(req.params.id) };

    models.timers.findOne(filter).then((result) => {
        if(result!==null){
            let updated_timer = {
                _id: result._id,
                title: result.title,
                sound: result.sound,
                duration: result.duration,
                started: new Date().getTime(),
                expires: new Date().getTime() + result.duration,
                style: result.style,
            };
            updated_timer.state = currentState(parseInt(updated_timer.started), parseInt(updated_timer.duration));
            models.timers.replaceOne(filter, updated_timer, { upsert: false }).then((result) => {
                eventBus.emit("timer.resumed", result)
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    })
})

/*
POST /timer/:id
cheat path to get the timer and update the timer's state
*/
router.post("/:id", function (req, res) {
    let filter = { _id: new ObjectId(req.params.id) };
    models.timers.findOne(filter).then((result) => {
        if (!result) {
            res.status(404).end();
        } else {
            let state = currentState(parseInt(result.started), parseInt(result.duration));
            if(state === "expired"){
                let updated_timer = {
                    _id: result._id,
                    title: req.body.title || result.title,
                    sound: req.body.sound || result.sound,
                    duration: req.body.duration || result.duration,
                    started: result.started,
                    style: req.body.style || result.style,
                    state: "expired",
                    update: true
                };
                updated_timer.expires = parseInt(updated_timer.started)+parseInt(updated_timer.duration);
                models.timers.replaceOne(filter, updated_timer, { upsert: false }).then((result) => {
                    res.status(201).end();
                });
            }
            if (req.accepts("json")) {
                res.json(result);
                return
            }
            res.send(result).status(200).end();
        }
    });
});

/*
GET /
returns the homepage of the application, which displays all timers present in the database and actions
to create new ones or delete existing ones. The timers should be refreshed at least every 1/10th of
a second to indicate how much time is left before they expire.
*/

module.exports = router;
