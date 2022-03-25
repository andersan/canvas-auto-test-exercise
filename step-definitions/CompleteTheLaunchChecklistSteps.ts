import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AdminPortalPage from "../pages/AdminPortalPage";

const pages = {
  login: LoginPage,
  home: HomePage,
};

Then(/^I verify app is registered with success$/, () => {
  AdminPortalPage.verifyAppIsRegistered();
});

Then(/^I install the Canvas extension$/, () => {
  AdminPortalPage.toggleOnInstallCanvasExtension();
});

Then(/^I learn about canvas$/, () => {
  AdminPortalPage.learnAboutCanvas();
});

Then(/^I add app name$/, () => {
  AdminPortalPage.addYourAppName();
});

Then(/^I add app logos$/, () => {
  AdminPortalPage.addAppLogos();
});

Then(/^I update log in page branding with (\w+) background$/, (type) => {
  AdminPortalPage.updateLog(type);
});

Then(/^I Update your default SEO \/ social tags$/, () => {
  AdminPortalPage.updateDefaultSeo();
});

Then(/^I learn about your app\'s development and live databases$/, () => {
  AdminPortalPage.learnAboutAppsDevelopment();
});

Then(/^I update navigation$/, () => {
  AdminPortalPage.updateNavigation();
});

Then(/^I enable outgoing email$/, () => {
  AdminPortalPage.enableOutgoingEmail();
});

