var parser = require('xml-mapping'),
    async = require("async"),
    Entities = require("../entities"),
    fs = require("fs");


function ComicRackDB(path) {
    this.path = path;
}

ComicRackDB.prototype.read = function (cb) {
    var dbPath = this.path;
    async.waterfall([
        function (next) {
            fs.readFile(dbPath, {encoding: "utf8"}, next);
        },
        (function (fileContent, next) {
            this.db = Entities.Models.Database.create(parser.load(fileContent));
            next(null, this.db);
        }).bind(this)
    ], cb);
};

ComicRackDB.prototype.write = function (path, cb) {
    if (arguments.length == 1) {
        cb = arguments[0];
        path = this.path;
    }

    async.waterfall([
        (function (next) {
            var xml = parser.dump(this.db.toJSON(), {indent: true});
            next(null, '<?xml version="1.0"?>\n' + xml)
        }).bind(this),
        function (xml, next) {
            fs.writeFile(path, xml, {encoding: "utf8"}, next)
        }
    ], cb)
};

module.exports=ComicRackDB;