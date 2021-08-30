const io = require('socket.io')();
const models = require("./models").model;


function init(server) {
    console.log("Starting WS server");
    io.attach(server);

    io.on('connection', function(socket){
        console.log('client connected ',socket.id);

        socket.on('disconnect', function(){
            console.log('client disconnected');
        });

        socket.on("messagetest", (msg)=>{
            console.log(msg);
        })

    });
}

//ws = require() = module.exports
//ws.init(server)

module.exports.init = init;


const EventEmitter = require('events');
const eventBus = new EventEmitter()
module.exports.eventBus = eventBus;

async function checkTimers() {
    const expiredTimers = await models.timers.find({
        expires: { $lte: Date.now() },
        update: { $exists: false }
        }).toArray();
    if (expiredTimers.length!==0){
        io.emit("timer.expired", expiredTimers);
    }
}
setInterval(checkTimers, 100);

eventBus.on('timer.created', function (event){
    io.emit('timer.created', event);
});

eventBus.on('timer.edited', function(event){
    io.emit('timer.edited', event);
});

eventBus.on('timer.deleted', function(event){
    io.emit('timer.deleted', event);
});

eventBus.on('timer.pause', function(event){
    io.emit('timer.pause', event);
});