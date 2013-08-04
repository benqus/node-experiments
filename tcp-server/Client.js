var Cache = require('./Cache');
var Message = require('./Message');
var EventMessage = require('./EventMessage');
var Session = require('./Session');

function Client(socket) {
    this.cache = new Cache();
    this.socket = socket;
    this.session = new Session(this);
    this.lastMessage = "";
}

Client.prototype = {
    constructor: Client,

    send: function (string) {
        if (typeof string === "string" && string !== "") {
            this.lastMessage = string;
            this.socket.write(string);
        }

        return this;
    },

    getData: function (path) {
        return this.cache.get(path);
    },

    setData: function (path, value) {
        var oldValue = this.getData(path);
        var message = new EventMessage(EventMessage.CLIENT_DATA_UPDATE);

        this.cache.set(path, value);

        message
            .multiSet({
                "path": path,
                "old": oldValue,
                "new": value
            });

        this.send(message.toString());

        return this;
    },

    close: function () {

        this.socket.close();
    }
};

module.exports = Client;