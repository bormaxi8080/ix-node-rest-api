'use strict';

/**
 * utility string Escaper class
 */
class Escaper {
    /**
     * Escaper class constructor
     */
    constructor() {
        this.regex = new RegExp(/[\0\x08\x09\x1a\n\r"'\\\%]/g);
    }

    /**
     * Escapes special symbols from str
     * @param str
     * @returns {*}
     */
    escape(str) {
        return str.replace(this.regex, this._escapeSpecialSymbols);
    }

    /**
     * Trim string and remove line break from end of str
     * @param str
     */
    trimEndLineBreak(str) {
        return str.trim().replace(/^\s+/, '');
    }

    escapeColorSymbols(str) {
        return str.replace(/\u001b\[.*?m/g, '');
    }

    _escapeSpecialSymbols(char){
        const m = ['\\0', '\\x08', '\\x09', '\\x1a', '\\n', '\\r', "'", '"', "\\", '\\\\', "%"];
        const r = ['\\\\0', '\\\\b', '\\\\t', '\\\\z', '\\\\n', '\\\\r', "''", '""', '\\\\', '\\\\\\\\', '\\%'];
        return r[m.indexOf(char)];
    }
}

export default Escaper;