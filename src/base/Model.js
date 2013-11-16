var Backbone = require("Backbone"),
    _ = require("Underscore");

var xmlValue = require("../services/XMLValue");

module.exports = Backbone.Model.extend(
    {
        subCollections: {},

        initialize: function () {
            this.xmlAttributes = [];
        },

        parse: function (data) {
            var attributes = {};
            var xmlAttributes = data[this.xmlName];

            _.each(xmlAttributes, function (value, name) {
                var parsedValue;

                var originalItem = {};
                originalItem[name] = value;

                var isSubCollection = _.isObject(value) && name in this.subCollections;
                var isTag = _.isObject(value);
                if (isSubCollection) {
                    parsedValue = this.subCollections[name].create(originalItem);
                } else if (isTag) {
                    parsedValue = xmlValue.parse(value.$t);
                } else {
                    this.xmlAttributes.push(name);
                    parsedValue = xmlValue.parse(value);
                }

                attributes[name] = parsedValue;

            }, this);

            return attributes;
        },

        toJSON: function () {
            var parsedJSON = {};

            _.each(this.attributes, function (value, name) {
                if (_.contains(this.xmlAttributes, name)) {
                    parsedJSON[name] = xmlValue.dump(value);
                } else if (value instanceof Backbone.Collection) {
                    var collectionJSON = value.toJSON();
                    parsedJSON[name] = collectionJSON[value.xmlName];
                } else {
                    parsedJSON[name] = { "$t": xmlValue.dump(value) }
                }
            }, this);

            var result = {};
            result[this.xmlName] = parsedJSON;
            return result;
        }

    },
    {
        create: function(data) {
            var model = new this();
            model.set(model.parse(data));
            return model;
        }
    }
);
