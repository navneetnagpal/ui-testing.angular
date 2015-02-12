Utils.Number = {
    isEqual: function(a, b, ignoreDiff) {
        if (ignoreDiff > 0) {
            if (!(a - ignoreDiff <= b && a + ignoreDiff >= b)) {
                return [a, ' = ', b].join('');
            }
            return true;

        }
        if (a !== b) {
            return [a, ' not matched with ', b].join('');
        }
        return true;
    }
}