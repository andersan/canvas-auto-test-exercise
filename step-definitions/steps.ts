import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NewAppPage from "../pages/NewAppPage";
import BubbleEditorPage from "../pages/BubbleEditorPage";
import AdminPortalPage from "../pages/AdminPortalPage";
import CanvasSignUpPage from "../pages/CanvasSignUpPage";
import CanvasExtension from "../extension/CanvasExtension";
import Utility from "../utility/Utility";
import Environment from "../Environment";
import PaymentPage from "../pages/PaymentPage";
import CanvasDashboardPage from "../pages/CanvasDashboardPage";


const [
  USERNAME_CHRIS,
  PASSWORD_CHRIS,
  USERNAME_PUBLIC,
  PASSWORD_PUBLIC,
  PAGE_NAME,
  APP_NAME,
] = Environment.getVars();

const pages = {
  login: LoginPage,
  home: HomePage,
};

Given(/^I am on the (\w+) page$/, (page) => {
  pages[page].open();
});

When(/^Log in to the account with (.+)$/, (username) => {
  console.log("login start");
  if (username == USERNAME_CHRIS) {
    LoginPage.login(username, PASSWORD_CHRIS);
  } else if (username == USERNAME_PUBLIC)
    LoginPage.login(username, PASSWORD_PUBLIC);
  else
  LoginPage.login(USERNAME_CHRIS, PASSWORD_CHRIS);
});

Then(/^I should see menu button called (.*)$/, (menu) => {
  console.log("MENU START");
  console.log(menu);
  expect(HomePage.menu).toBeExisting();
  expect(HomePage.menu).toHaveTextContaining(menu);
});

let appName: string;
When(/^I create a new app (.+)$/, (button) => {
  HomePage.createNewApp(button);
  appName = NewAppPage.fillOutNewAppForm();
  NewAppPage.closePopUp();
});

Then(/^New app is created$/, () => {
  let applicationName =
    Utility.extract(BubbleEditorPage.title(), "(.+? | )", 1) === appName;
  console.log("applicationName = " + applicationName);
});

let parentTab: string;

When(/^I run the app as an admin user$/, () => {
  parentTab = BubbleEditorPage.getCurrentWindowHandle();
  BubbleEditorPage.runAsAdminUser();
});

When(/^I open url$/, () => {
  let url = AdminPortalPage.constructUrl(appName);
  console.log(url);
  AdminPortalPage.openNewUrl(url);
});

Then(/^I do basic authentication$/, () => {
  AdminPortalPage.basicAuthenticationPopUp();
});

Then(/^I do canvas authentication$/, () => {
  CanvasSignUpPage.switchTo(tabs);
  AdminPortalPage.canvasAuthenticationPopUp();
});

Then(/^I redirected to admin portal$/, () => {
  AdminPortalPage.switchToAdminPortal(parentTab);
});


Then(/^I add app identifiers$/, { timeout: 480000 }, () => {
  AdminPortalPage.addAppIdentifiers();
});


Then(/^I verified the registration$/, () => {
  AdminPortalPage.verifyReg();
});

let currentTab: string;
When(/^I register the app with Canvas$/, () => {
  tabs = AdminPortalPage.getAllHandles();
  console.log("tabs = " + tabs);
  AdminPortalPage.registerApp();
});

let tabs: string[];

When(/^I register app$/, () => {
  tabs = AdminPortalPage.getAllHandles();
  console.log("tabs = " + tabs);
  AdminPortalPage.register();
});

let canvasTab: string;

Then(/^I redirected to the canvas sign up page with title (.+)$/, (title) => {
  // let handles = CanvasSignUpPage.getAllPageCanvasHadles();
  // console.log("handles " + handles);
  console.log("tabs = " + tabs.length);
  CanvasSignUpPage.switchToLastOneTab(tabs);
  // canvasTab = CanvasSignUpPage.getCanvasPageWindowHandle();
  // console.log("canvasTab tab = " + canvasTab);
  // CanvasSignUpPage.switchToCanvasSignUpTab(canvasTab);
  // assert.equal(CanvasSignUpPage.getCanvasPageTitle(), title);
});

When(/^I log in as admin to canvas$/, () => {
  CanvasSignUpPage.loginToCanvas();
  CanvasSignUpPage.registerApp();
});

When(/^I log in as public admin to canvas$/, () => {
  CanvasSignUpPage.publicLoginToCanvas();
  CanvasSignUpPage.registerApp();
});

Then(/^I choose (.+) license$/, (license) => {
  if (license == "Premium") {
    CanvasSignUpPage.selectPremiumLicense(license);
  } else if (license == "Free")
  CanvasSignUpPage.selectLicense(license);
});

Given(/^I am back on the Bubble Editor page$/, () => {
  CanvasExtension.backToBubbleEditorTab();
});

When(/^I close pop up and go to Design tab$/, () => {
  BubbleEditorPage.closePopUp("Design");
});

When(/^I open Canvas Extension$/, () => {
  CanvasExtension.openCanvasExtension();
});

Then(/^I add a new page (.+) to the Bubble app$/, (page) => {
  let expectedPageName = CanvasExtension.addNewPage(page);
  expect(CanvasExtension.pageName).toBeExisting();
  expect(CanvasExtension.pageName).toHaveTextContaining(expectedPageName);
});

Then(/^I go back to home$/, () => {
  CanvasExtension.backToHome();
});

Then(/^I get a warning message (.+)$/, (message) => {
  CanvasExtension.switchToCanvasIframe();
  expect(CanvasExtension.warningMessage(message)).toHaveTextContaining(message);
  CanvasExtension.switchToParentFrame();
});

When(/^I add a Search Page$/, () => {
  CanvasExtension.addPage(7);
  CanvasExtension.typePageName("Search ");
});

When(/^I add a page$/, (page) => {
  CanvasExtension.addPage(page);
  CanvasExtension.typePageName(page);
});

When(/^I add a specific page$/, () => {
  let expectedPageName = CanvasExtension.addNewPage(PAGE_NAME);
  expect(CanvasExtension.pageName).toBeExisting();
  expect(CanvasExtension.pageName).toHaveTextContaining(expectedPageName);
});

Then(/^I click on add new page button$/, () => {
  CanvasExtension.clickAddNewPage();
});


When(/^I click on upgrade license button$/, () => {
  CanvasExtension.upgradeLicenseBtn();
});

Then(/^I upgrade license to professional$/, () => {
  CanvasSignUpPage.switchToLastOneTab(tabs);
  CanvasSignUpPage.updateLicensePro();
});

Then(/^I sign in to owner account$/, () => {
  CanvasSignUpPage.signinToOwnerAcc();
  CanvasSignUpPage.publicLoginToCanvas();
});

Then(/^I add all pages$/, { timeout: 480000 }, (DataTable) => {
  let rows = DataTable.rows();
  for (let i = 0; i < rows.length; i++) {
    let pageNumber: number = +rows[i].toString();
    console.log(pageNumber);
    CanvasExtension.addPages(pageNumber);
  }
});


Then(/^I add app identifiers to the copied app$/, () => {
  AdminPortalPage.submitAppIdentifiers();
});


Then(/^I should see the dashboard page with title(.+)$/, (title) => {
    assert.equal(CanvasDashboardPage.getCanvasDashboardPageTitle(), title);
});

When(/^I go to Data tab and open Canvas app database$/, () => {
  parentTab = BubbleEditorPage.getCurrentWindowHandle();
  BubbleEditorPage.openCanvasAppDB();
});

Then(/^I change canvas site base url$/, () => {
  BubbleEditorPage.changeSiteBaseUrl();
});

When(/^I copy a specific app$/, () => {
  HomePage.copySpecApp(APP_NAME);
});


When(/^I open test mode url$/, () => {
  CanvasExtension.bubbleTestMode();
});

When(/^I reload session$/, () => {
  CanvasExtension.reload();
});



