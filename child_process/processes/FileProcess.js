var fs = require('fs');

//reads the given file
var readFile = function (file, uid) {
    fs.readFile(file, function (err, content) {
        if (err) {
            console.log(err.message);
            return;
        }

        var json = content.toString();

//        console.log("CHILD: ", json);

        process.send({
            "content": json,
            "uid": uid
        });
    });
};

process.on('message', function (data) {
    //file path
    var path = [
        __dirname,
        'file',
        data.file
    ].join('/');

    //check whether file exists
    fs.exists(path, function (exists) {

        //read file if exists
        if (exists) {
            readFile(path, data.uid);
        } else {
            console.log("File " + data.file + " doesn't exist!");
        }
    });
});