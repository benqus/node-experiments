var net = require('net');
var Client = require('./Client');

function Server(port) {
    this.connection = undefined;
    this.clients = [];
    this.port = (port || 8888);
}

Server.prototype = {
    constructor: Server,

    start: function () {
        //creating server
        var connection = net.createServer(this.clientConnect.bind(this));
        connection.listen(this.port);

        this.connection = connection;
    },

    clientConnect: function (socket) {
        var client = new Client(socket);
        console.log("New client connected...");

        //registering client
        this.clients.push(client);
    },

    stop: function () {
        //closing client sockets
        this.clients
            .forEach(function (client) {
                client.close();
            });

        //close connection if there is one
        this.connection && this.connection.close();
    }
};

module.exports = Server;