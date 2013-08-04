module.exports = {
    generateUniqueID: (function () {
        var id = 0;

        return function (prefix) {
            var hexId = (id++).toString(16);
            var hexDate = Date.now().toString(16);
            var hexPrefix = "";

            (prefix || "")
                .split("")
                .forEach(function (c) {
                    hexPrefix += c.charCodeAt().toString(16);
                });

            return [hexId + hexPrefix + hexDate].join("_");
        }
    }())
};