var Message = require('./Message');

function EventMessage(eventType) {
    Message.call(this);

    this.set("type", eventType || EventMessage.CLIENT_DATA_UPDATE);
}

EventMessage.prototype = Object.create(Message.prototype);
EventMessage.prototype.constructor = EventMessage;

EventMessage.prototype.toString = function () {
    return ("event " + Message.prototype.toString.call(this));
};

EventMessage.CLIENT_DATA_UPDATE = "clientDataUpdate";

module.exports = EventMessage;