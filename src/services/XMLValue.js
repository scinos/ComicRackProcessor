var re = {
    num: /^\d+$/,
    bool: /^(true|false)$/i,
    date: /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)$/
};

module.exports = {
    parse: function parse(val) {
        if ( val == null ) return null;
        if (val.match(re.num)) return Number(val);
        if (val.match(re.bool)) return val.toLocaleLowerCase() == "true";
        if (val.match(re.date)) return new Date(val);
        return val;
    },

    dump: function dump(val) {
        if ( val == null ) return null;
        if (val instanceof Date) return val.toISOString();
        return val.toString();
    }
};
