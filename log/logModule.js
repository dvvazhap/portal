var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/server.log', { flags: 'a' });
exports.log = function (type, d) {
    let date = new Date(Date.now());
    log_file.write("[" + date + "] " + type + " : " + util.format(d) + '\n');
};