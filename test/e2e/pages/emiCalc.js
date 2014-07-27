 var EmiCalc = function() {

     var dom = {
         container: by.css(".ui-app-view .emicalc") ,
         inputForm: {
             loanAmount:  by.css(".ui-app-view .emicalc #loanAmount"),
             roi: by.css(".ui-app-view .emicalc #roi"),
             tenure: by.css(".ui-app-view .emicalc #tenure"),
             calculate: by.id('btnCalculate'),
             reset: by.id('btnReset')
         },
         scheduleTable: {
            container:by.css(".ui-app-view .emicalc .schedule-table")

         },
         details: {
            container:by.css(".ui-app-view .emicalc .details")
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
         isResultsVisible:function(){
            return  element(dom.scheduleTable.container).isDisplayed()
             &&  element(dom.scheduleTable.container).isDisplayed() ;
         }
     }

 };


 module.exports = EmiCalc;