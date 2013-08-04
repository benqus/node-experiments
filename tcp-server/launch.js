var fs = require('fs');
var Server = require('./Server');

var file = process.argv[2];

if (file === undefined) {
    file = "settings.json"
} else if (!(/\.json$/).test(file)) {
    file += ".json";
}

var main = {
    server: undefined,

    settings: undefined,

    readSettings: function (file) {
        var self = this;
        var filePath = (__dirname + '/' + file);

        //if file exists
        fs.exists(filePath, function (exists) {

            //if file exists
            if (exists) {

                //reading JSON settings
                fs.readFile(filePath, function (error, contents) {
                    //in case of error
                    if (error) {
                        console.log(error);
                        return;
                    }

                    console.log("Lanching TCP server with the following settings: " + contents.toString());

                    self.settings = JSON.parse(contents);
                    self.launch();
                });
            } else {
                console.log("Cannot start TCP server: '" + filePath + "' settings file does not exists!");
            }
        });
    },

    launch: function () {
        this.server = new Server(this.settings.port);

        //subscribing to process events
        this.initProcess();

        //launching server
        this.server.start();
    },

    //process related stuff
    initProcess: function () {
        var server = this.server;

        process
            .on('exit', function () {
                console.log("Server is shutting down...");
                server.stop();
            });
    }
};

//launching server
main.readSettings(file);
