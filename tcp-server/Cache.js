function Cache() {
    this.cache = {};
}

Cache.prototype = {
    constructor: Cache,

    getPath: function (path) {
        return (path instanceof Array ? path : path.split("."));
    },

    resolve: function (path) {
        var branch = this.cache;
        var key;

        while (path.length > 0) {
            key = path.shift();
            branch = branch[key] || (branch[key] = {});
        }

        return branch;
    },

    get: function (rawPath) {
        var path = this.getPath(rawPath);
        var branch = this.cache;

        while (branch && path.length > 0) {
            branch = branch[path.shift()];
        }

        return branch;
    },

    set: function (rawPath, value) {
        var path = this.getPath(rawPath);
        var key = path.pop();
        var branch = this.resolve(path);

        branch[key] = value;

        return this;
    },

    unset: function (rawPath) {
        var path = this.getPath(rawPath);
        var key = path.pop();
        var branch = this.resolve(path);

        delete branch[key];

        return this;
    },

    empty: function () {
        this.cache = {};
    }
};

module.exports = Cache;