var allure = require("allure-commandline");
const moment = require("moment");
let screenshotName: string;
// import AbstractPage from "./pages/AbstractPage";
// const page = require("./pages/AbstractPage");

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

export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.json",
    },
  },

  runner: "local",

  specs: [
    "./features/AddNewPageBubble.feature",
    "./features/LoginLogout.feature",
    "./features/Add2-ColumnVideoChatPage.feature",
    "./features/CreateNewApp.feature",
    "./features/AddToggleTabsGroupBlock.feature"
  ],
  // Patterns to exclude.
  exclude: [],

  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        // Install upon starting browser in order to launch it
        extensions: [
          // Entry should be a base64-encoded packed Chrome app (.crx)
          require("fs")
            .readFileSync("./extension/1.4.0_0.crx")
            .toString("base64"),
        ],

        args: [
          "--start-maximized",
          "--window-size=2048,1536",
          // "--headless", //comment extensions: [] - it doesn't work in headless mode
          "--no-sandbox",
          "--disable-dev-shm-usage", //for docker space
          "--disable-setuid-sandbox",
          "--disable-gpu", //only for windows
          "--disable-popup-blocking",
          "--disable-notifications",
          "--disable-extensions-except=./extension/unpacked/apmembkcpmjhmecifhckdidppfoiajie/1.4.0_0",
          "--load-extension=./extension/unpacked/apmembkcpmjhmecifhckdidppfoiajie/1.4.0_0",
        ],
      },
      acceptInsecureCerts: true,
    },
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "info",
  outputDir: "./logs",

  logLevels: {
    webdriver: "info",
    //     '@wdio/applitools-service': 'info'
    "@wdio/cucumber-framework": "debug",
  },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  baseUrl: "https://bubble.io",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 150000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 150000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  services: ["chromedriver", "shared-store"],

  framework: "cucumber",

  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        useCucumberStepReporter: false,
        disableWebdriverScreenshotsReporting: false,
        disableWebdriverStepsReporting: false,
      },
    ],
  ],

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ["./step-definitions/*.ts"],
    // <boolean> show full backtrace for errors
    backtrace: true,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: true,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: ["pretty"],
    // <boolean> hide step definition snippets for pending steps
    snippets: false,
    // <boolean> hide source uris
    source: true,
    // <string[]> (name) specify the profile to use
    profile: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: "",
    // <number> timeout for step definitions
    timeout: 120000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },

  beforeCommand: function () {
    browser.execute("localStorage.setItem('canvas_ran_before', '1')");
    //browser.execute("$(window).off('beforeunload');");
  },

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

  afterStep: function (
    test,
    context,
    { error, result, duration, passed, retries },
  ) {
    if (error) {
      browser.takeScreenshot();
      console.log("Taking screenshot from afterStep hook.....");
      // const fullPath = "./screenshots/" + screenshotName;
      // browser.saveScreenshot(fullPath);
    } else {
      console.log("Nothing");
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
            "\n##################### BROWSER CONSOLE ERRORS #####################\n",
          );

          for (const msg of messages) {
            console.log(`${msg}\n`);
          }

          console.log(
            "########################################################################\n",
          );
        }
      }
      try {
        console.log("Taking screenshot... ");
        browser.takeScreenshot();
        console.log("Saving screenshot... ");
        browser.saveScreenshot(fullPath);
      } catch (error) {
        console.log(error + " Taking screenshot failed");
      }
    }
  },
};
