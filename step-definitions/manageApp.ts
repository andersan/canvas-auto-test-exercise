import {
  Given,
  When,
  Then,
  setDefinitionFunctionWrapper,
} from "@cucumber/cucumber";
import HomePage from "../pages/HomePage";
import { assertTrue } from "../assert/Assert";
import Utility from "../utility/Utility";
import BubbleEditorPage from "../pages/BubbleEditorPage";

let appName: string;

When(/^I delete an app with the name containing (.+)$/, (substring) => {
  appName = HomePage.deleteApp(substring);
});

Then(/^App is removed from the home page$/, () => {
  console.log("Output = " + HomePage.isAppNotExisting(appName));
  assertTrue(HomePage.isAppNotExisting(appName));
});



When(/^I copy an app with the name containing (.+)$/, (substring) => {
  appName = HomePage.copyApp(substring);
});


Then(/^App is copied$/, () => {
  let appCopyName =
    Utility.extract(BubbleEditorPage.title(), "(.+? | )", 1) === appName + "-copy";
  console.log("applicationName = " + appCopyName);
});