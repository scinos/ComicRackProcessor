var path = require("path");

var ComicRackDB = require('./services/ComicRackDB');

function getComicDbPath() {
    return path.join(process.env.APPDATA, "cyo", "ComicRack", "ComicDb.xml");
}

var db = new ComicRackDB(getComicDbPath());
db.read(function(err, data) {
    db.write("test.xml", function(err, data) {
        console.log("done");

    });
});