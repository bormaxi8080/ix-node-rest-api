'use strict';

class QueryUtils {
    static fieldToArray(field) {
        field = field.replace("{", "").replace("}", "").replace("[", "").replace("]", "");
        field = field.split(",");
        return field;
    }
}

export default QueryUtils;