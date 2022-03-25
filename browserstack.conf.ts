var allure = require("allure-commandline");
const moment = require("moment");
let screenshotName;
const domainsToBlock = [
  "cdn.pendo.io",
  "fullstory.com",
  "notify.bugsnag.com",
  "ssl.google-analytics.com",
];

function buildHostResolverRules(domainsToAdd) {
  if (Array.isArray(domainsToAdd) && domainsToAdd.length > 1) {
    let hostResolverRules = "";

    domainsToAdd.forEach((domain) => {
      hostResolverRules += `MAP ${domain} 127.0.0.1, `;
    });

    // Remove the ", " characters from the last item of the built array
    return hostResolverRules.slice(0, -2);
  }

  return "";
}

const sourcesToIgnore = [];

// Messages content to ignore
const contentToIgnore = domainsToBlock.concat([
  '"[bugsnag]" Error:', // related to the errors caused by blocked domain
  "You are currently using minified code outside of NODE_ENV", // have no idea, but this happens everywhere...
]);

const isMessageToIgnore = function (listToIgnore, content) {
  for (const textToIgnore of listToIgnore) {
    if (content.includes(textToIgnore)) {
      return true;
    }
  }

  return false;
};

const filteredMessages = function (logs) {
  const messages = [];

  for (const msg of logs) {
    const ignoredSource = isMessageToIgnore(sourcesToIgnore, msg.source);
    const ignoredContent = isMessageToIgnore(contentToIgnore, msg.message);

    if (msg.level === "SEVERE" && !ignoredSource && !ignoredContent) {
      messages.push(msg.message);
    }
  }

  return messages;
};

let file_path = './extension/extension_1_2_2_0.crx';
let canvasExtension = require("fs").readFileSync("./extension/extension_1_2_2_0.crx").toString("base64");

exports.config = {

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.json",
    },
  },
 
  user: 'lenjatest1',
  key: 'fmLCf8LVME81KwBA5Ay4',

  services: [
    ['browserstack', {
      browserstackLocal: false
    }]
  ],

  updateJob: false,
  specs: [
    // "./features/addNewPageBubble.feature",
    // "./features/appIsNotRegistered.feature",
    // "./features/SwitchToDesignTabWarning.feature",
    "./features/Add2-ColumnVideoChatPage.feature" 
  ],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    name: 'lenja_test',
    build: 'browserstack-build-1'
  },
  capabilities: [{
    'browserstack.debug': 'true',
    'browserstack.console': 'info',
    'browserstack.networkLogs': 'true',
    'browser': 'chrome',
    'browser_version': '91',
    'browserstack.idleTimeout': 110000,
    "browserstack.selenium_version" : "2.53.0",
    // 'os': 'OS X',
    // 'os_version': 'Big Sur',
    'os': 'Windows',
    'os_version': '10',
    'acceptSslCert': 'true',
    'chromeOptions': {
      extensions: [canvasExtension],
      args: [
        "--start-maximized"
      ],
    },
    'resolution': '1920x1080',
  }],

  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'https://bubble.io',
  waitforTimeout: 140000,
  connectionRetryTimeout: 140000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  framework: 'cucumber',
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ["./step-definitions/*.ts"],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: ["pretty"],
    // <boolean> hide step definition snippets for pending steps
    snippets: false,
    // <boolean> hide source uris
    source: true,
    // <string[]> (name) specify the profile to use
    profile: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: true,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: "",
    // <number> timeout for step definitions
    timeout: 135000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },

  // Code to mark the status of test on BrowserStack based on the assertion status
  onComplete: function (exitCode, config, capabilities, results) {
    const reportError = new Error("Could not generate Allure report");
    try {
      const generation = allure(["generate", "./allure-results", "--clean"]);

      console.log("Allure report successfully generated");
      const generationTimeout = 15000;
      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reportError;
        }
      });
    } catch (error) {
      console.log(error + " Allure report is not generated");
    }
  },

  afterCommand: function (commandName, args, result, error) {
    if (error) {
      screenshotName = moment().toISOString() + ".png";

      const fullPath = "./screenshots/" + screenshotName;

      console.log(`FAILED TEST: ` + screenshotName);

      console.log(`URL: ${browser.getUrl().substring(8)}`);

      const logs = browser.getLogs("browser");

      if (logs.length > 0) {
        // Filter messages
        const messages = filteredMessages(logs);

        // Print all filtered messages
        if (messages.length > 0) {
          console.log(
            "\n##################### BROWSER CONSOLE ERRORS #####################\n"
          );

          for (const msg of messages) {
            console.log(`${msg}\n`);
          }

          console.log(
            "########################################################################\n"
          );
        }
      }
      try {
        console.log("Taking screenshot... ");
        browser.saveScreenshot(fullPath);
        browser.takeScreenshot();
      } catch (error) {
        console.log(error + " Taking screenshot failed");
      }
    }
  },
};
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps, index){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
  exports.config.capabilities[index] = { ...caps, ...caps['browser'] && { browserName: caps['browser'] } };
});

