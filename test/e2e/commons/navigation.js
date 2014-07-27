var EmiCalc = require('../pages/emiCalc');


var Navigation = function() {

    var domObjects = {
        mainNav: by.css('#mainNav'),
        emiCalcLink: by.css('#mainNav .emicalc')
    };

    this.goto = function(pageName) {
        var targetPage;
        switch (pageName) {
            case 'emicalc':
                element(domObjects.emiCalcLink).click();
                targetPage = new EmiCalc();
                break;
        }

        return targetPage;
    };

};

module.exports = Navigation;