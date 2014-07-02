/*
    This configuration is used for developer instance unit testing and end to end testing scenario.
    Does not interface with the application code base.
 */



exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  // capabilities: {
  //   'browserName': 'firefox'
  // },
    multiCapabilities : [{
          'browserName': 'chrome'
        }
        // ,{
        // 'browserName': 'firefox'
        // }
        // ,{
        // 'browserName': 'ie9'
        // }
        ],


  baseUrl: 'http://localhost:9000',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    'test/e2e/**/*.js'
    ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: function(){
    var ptor = protractor.getInstance();
    var driver = browser.driver;
    driver.get(browser.baseUrl);
    // setting extra width so that cq sidekick overlay 
    // doesn't overlay over and interfere interactions with site elements
    driver.manage().window().setSize(1750, 815);    
     
  }

};
