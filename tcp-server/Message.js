function Message() {
    this.map = {};
    this.order = [];
}

Message.prototype = {
    constructor: Message,

    set: function (key, value) {
        var order = this.order;

        this.map[key] = value;

        if (order.indexOf(key) < 0) {
            order.push(key);
        }

        return this;
    },

    multiSet: function (params) {
        var key;

        params || (params = {});

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                this.set(key, params[key]);
            }
        }

        return this;
    },

    toString: function () {
        var string = [];
        var map = this.map;

        this.order
            .forEach(function (key) {
                if (key !== "") {
                    string.push(key + "=" + map[key]);
                }
            });

        return string.join(" ");
    }
};

module.exports = Message;