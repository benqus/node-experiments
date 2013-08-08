var childProcess = require("child_process");
var events = require("events");
var EventHub = new events.EventEmitter();
var FILE_READ_EVENT = 'eventFileRead';
var PORT = 8888;

//method generates an module-wide unique ID
var generateUniqueID = (function () {
    var uid = 0;
    return function (prefix) {
        return ((prefix || "") + (uid++));
    };
})();

//forking child process
var FileProcess = childProcess.fork([
    __dirname,
    'processes/FileProcess.js'
].join('/'));

//subscribing to child process events
FileProcess
    .on('message', function (data) {
        //emitting data
        EventHub
            .emit(FILE_READ_EVENT, data);
    });

var server = function (req, res) {
    var uid = generateUniqueID();
    var callback = function (data) {
        //if data is specific to this handler scope
        if (data.uid === uid) {
            console.log("Response: ", data.content);

            //write end of response
            res.end(data.content);

            //unsubscribing from EventHub
            EventHub
                .removeListener(FILE_READ_EVENT, callback);
        }
    };

    //subscribing to EventHub to get notified when the file contents are available
    EventHub
        .addListener(FILE_READ_EVENT, callback);

//    console.log("Sending request to child process...", req.url);

    //send file name to read
    FileProcess
        .send({
            "file": process.argv[2] || "test.json",
            "uid": uid
        });

    //header
    res.writeHead(200, {'Content-type': 'text/html'});
};

require('http')
    .createServer(server)
    .listen(PORT);