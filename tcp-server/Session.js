var Utilities = require('./Utilities');
var registry = {};

function Session() {
    var id = Utilities.generateUniqueID("session_");

    //register Session
    registry[id] = this;

    this._id = id;
    this._storage = {};
}

Session.prototype = {
    constructor: Session,

    getSessionId: function () {
        return this._id;
    },

    get: function (key) {
        return this._storage[key];
    },

    set: function () {
        var arg1 = arguments[0];
        var storage = this._storage;
        var key;

        if (arg1 instanceof Object) {
            for (key in arg1) {
                if (arg1.hasOwnProperty(key)) {
                    storage[key] = arg1[key];
                }
            }
        } else {
            storage[arg1] = arguments[1];
        }

        return this;
    },

    destroy: function () {
        delete registry[this._id];
    }
};

Session.registry = registry;
Session.getSession = function (id) {
    return registry[id];
};

module.exports = Session;