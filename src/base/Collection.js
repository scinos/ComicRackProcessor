var Backbone = require("Backbone"),
    _ = require("Underscore");

module.exports = Backbone.Collection.extend(
    {
        parse: function (data) {
            var modelName = this.model.prototype.xmlName;
            var collectionName = this.xmlName;

            // If the collection is empty, return nothing
            if (!(modelName in data[collectionName])) return;

            // Ensure we always works with arrays
            var items = [].concat(data[collectionName][modelName]);
            return _.map(items, function(item) {
                var modelData = {};
                modelData[modelName] = item;
                return this.model.create(modelData);
            }, this);
        },

        toJSON: function() {
            var items = this.invoke("toJSON");
            var modelName = this.model.prototype.xmlName;
            var collectionName = this.xmlName;

            var result = {};
            result[collectionName] = {};

            if (items.length) {
                result[collectionName][modelName] = _.pluck(items, modelName)
            }

            return result;
        }
    },
    {
        create: function(data) {
            var collection = new this();
            collection.add(collection.parse(data));
            return collection;
        }
    }
);
