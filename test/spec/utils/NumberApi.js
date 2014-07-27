Utils.Number = {
    isEqual: function(a, b, ignoreDiff) {
        if (ignoreDiff > 0) {
            return a - ignoreDiff <=b && a+ignoreDiff >= b ;
        }
        return a === b;
    }
}