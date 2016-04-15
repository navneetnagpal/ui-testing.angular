 var EmiCalc = function() {

     var dom = {
         container: by.css(".ui-app-view .emicalc-cnt") ,
         offers: {
            btnToggle:by.css('#availableOffers .btn.dropdown-toggle')
         },
         inputForm: {
             loanAmount:  by.css(".ui-app-view .emicalc-cnt #loanAmount"),
             roi: by.css(".ui-app-view .emicalc-cnt #roi"),
             tenure: by.css(".ui-app-view .emicalc-cnt #tenure"),
             calculate: by.id('btnCalculate'),
             reset: by.id('btnReset')
         },
         scheduleTable: {
            container:by.css(".ui-app-view .emicalc-cnt .schedule-table")

         },
         details: {
            container:by.css(".ui-app-view .emicalc-cnt .details")
         }
     };
     return {
         isDisplayed : function() {
             return  element(dom.container).isDisplayed();
         },
         isFormAvailable:function(){
             return  element(dom.inputForm.loanAmount).isDisplayed()
             &&  element(dom.inputForm.roi).isDisplayed() 
             && element(dom.inputForm.tenure).isDisplayed();
         },
         enterData:function(p,roi,tenure) {
            element(dom.inputForm.loanAmount).sendKeys(p);
            element(dom.inputForm.roi).sendKeys(roi);
            element(dom.inputForm.tenure).sendKeys(tenure);
            element(dom.inputForm.calculate).click()
            browser.waitForAngular();
         },
         reset:function(){
            element(dom.inputForm.reset).click();
         },
         selectOffer:function(num){
            element(dom.offers.btnToggle).click();
            element(by.css('#availableOffers .dropdown-menu li:nth-child('+num+')')).click();
         },
         isResultsVisible:function(){
            return  element(dom.scheduleTable.container).isDisplayed()
             &&  element(dom.scheduleTable.container).isDisplayed() ;
         }
     }

 };


 module.exports = EmiCalc;