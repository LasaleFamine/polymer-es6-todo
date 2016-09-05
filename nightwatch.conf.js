const nightwatchCucumber = require('nightwatch-cucumber')({
  runner: 'nightwatch',
  featureFiles: 'test/integration/features',
  stepDefinitions: 'test/integration/features/step_definitions',
  closeSession: 'afterFeature',
  htmlReport: 'test/integration/reports/index.html',
  openReport: false
})

// Optionally store youre Evironment Variables in .env
//require('env2')('.env');
// So we can get the version of the project
const PKG = require('./package.json');
// change if required.
const BINPATH = './node_modules/nightwatch/bin/';
const SCREENSHOT_PATH = "./test/integration/screenshots/" + PKG.version + "/"
//const LOGS_PATH = "./test/integration/logs/" + PKG.version + "/"

// We use a nightwatch.conf.js file so we can include comments and helper functions
const config = {
  // We use /test as the name of our test directory by default.
  // So test/integration for integration
  "src_folders":
    [nightwatchCucumber],
  // Reports (test outcome) output by nightwatch
  //"output_folder": "./test/integration/reports",
  "selenium": {
    "start_process": true,
    // Downloaded by selenium-download module (see below)
    "server_path": BINPATH + "selenium.jar",
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      // Also downloaded by selenium-download
      "webdriver.chrome.driver": BINPATH + "chromedriver"
    }
  },
  // Perform tests in parallel where possible
  /*"test_workers": {
    "enabled": true,
    "workers": "auto"
  },*/
  "test_settings": {
    "default": {
      // Default testing on localhost
      "launch_url": "http://localhost:3000",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "screenshots": {
        // Save screenshots to this directory (excluded by .gitignore)
        "enabled": true,
        "path": SCREENSHOT_PATH
      },
      "globals": {
        // Wait for content on the page bsauefore continuing
        "waitForConditionTimeout": 10000,
        "env": "LOCAL",
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            "--window-size=1200,800"
          ]
        },
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
module.exports = config;

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function(err, stat) {
  // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      // no point continuing so exit!
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

// theregister.co.uk/2016/03/23/npm_left_pad_chaos/
function padLeft(count) {
  return count < 10 ? '0' + count : count.toString();
}

// "global" screenshot file count
var FILECOUNT = 0;
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  // this is the test filename so always exists.
  meta.push(a.name);
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
