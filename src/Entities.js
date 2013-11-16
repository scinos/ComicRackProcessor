var BaseCollection = require("./base/Collection"),
    BaseModel = require("./base/Model");

var Page = BaseModel.extend({
    xmlName: "Page",
    idAttribute: "Image"
});
var Pages = BaseCollection.extend({
    model: Page,
    xmlName: "Pages"
});

var Book = BaseModel.extend({
    xmlName: "Book",
    idAttribute: "Id",
    subCollections: {
        "Pages": Pages
    }
});
var Books = BaseCollection.extend({
    xmlName: "Books",
    model: Book
});

var Matcher = BaseModel.extend({
    xmlName: "ComicBookMatcher"
});
var Matchers = BaseCollection.extend({
    xmlName: "Matchers",
    model: Matcher
});

var Items = BaseCollection.extend({
    xmlName: "Items"
});
var Item = BaseModel.extend({
    xmlName: "Item",
    idAttribute: "Id",
    subCollections: {
        "Matchers": Matchers,
        "Items": Items
    }
});
var ComicLists = BaseCollection.extend({
    xmlName: "ComicLists",
    model: Item
});
Items.prototype.model = Item;

var WatchFolder = BaseModel.extend({
    xmlName: "WatchFolder",
    idAttribute: "Folder"
});
var WatchFolders = BaseCollection.extend({
    xmlName: "WatchFolders",
    model: WatchFolder
});

var Database = BaseModel.extend({
    idAttribute: "Id",
    xmlName: "ComicDatabase",
    subCollections: {
        "Books": Books,
        "ComicLists": ComicLists,
        "WatchFolders": WatchFolders
    }
});

module.exports = {
    Collections: {
        Books: Books,
        ComicLists: ComicLists,
        Items: Items,
        Matchers: Matchers,
        Pages: Pages,
        WatchFolders: WatchFolders
    },
    Models: {
        Book: Book,
        Item: Item,
        Matcher: Matcher,
        Page: Page,
        WatchFolder: WatchFolder,
        Database: Database
    }
};
