import AbstractPage from "./AbstractPage";
import Utility from "../utility/Utility";

class AdminPortalPage extends AbstractPage {
  private checklistOption = ".bubble-element.GroupItem.group-item.entry-";

  private addAppIdsBtn = this.checklistOption + "2";
  private confirm = '//*[text()="Confirm"]';
  private check = ".ion-ios-checkmark.inner-element.bubble-element";

  switchToAdminPortal(parentTab: string) {
    this.switchToTab(parentTab);
  }

  private closeVideo =
    '//*[@class="feather feather-x"]/parent::div/parent::div/parent::div/parent::div/parent::div';

  learnAboutCanvas() {
    this.click(this.checklistOption + "1");
    this.click(this.closeVideo);
  }

  addAppIdentifiers() {
    this.waitForPageLoaded();
    this.pause(1000);
    this.refreshPage();
    this.waitForPageLoaded();
    this.click(this.addAppIdsBtn);
    this.click(this.confirm);
    this.click(this.check);
  }


  private checkAppWasCopied = "//label[contains(text(), 'The app was copied')]";
  private submitAppWasCopied = "//*[@id='app-identifiers-popup']/div/div/button[contains(text(), 'Submit')]";
  private appIdPopup = "//div[@id='app-identifiers-popup']";

  
  submitAppIdentifiers(){
    if (this.isClickable(this.appIdPopup)) {
      this.click(this.appIdPopup);
      this.click(this.checkAppWasCopied);
      this.pause(5000);
      this.click(this.submitAppWasCopied);
    } else {
      this.click(this.addAppIdsBtn);
      this.click(this.confirm);
      this.click(this.check);
    }
    
  }





  // https://autotest-u6wdfu95t.bubbleapps.io/version-test?debug_mode=true

  constructUrl(appName: string) {
    const url =
      "https://username:password@" +
      appName +
      ".bubbleapps.io/version-test?debug_mode=true";
    return url;
  }

  openNewUrl(url: string) {
    this.pause(10000);
    try {
      this.openNewWindow(url);
      console.log("New url is open " + url);
    } catch (error) {
      console.log(error + "Couldn't open new url");
    }
  }

  constructNewUrl(url: string) {
    this.pause(10000);
    const testPart = "&canvas-version=test";
    const authenticationUrl = url + testPart;
    console.log("authenticationUrl " + authenticationUrl);
    this.openNewWindow(authenticationUrl);
    this.reloadPage();
    this.waitForPageLoaded();
  }

  basicAuthenticationPopUp() {
    this.waitForPageLoaded();
    const currentUrl = browser.getUrl();
    const authPart = "https://username:password@";
    const split = currentUrl.slice(currentUrl.indexOf("a"));
    const authenticationUrl = authPart + split;
    console.log("authenticationUrl " + authenticationUrl);
    this.open(authenticationUrl);
  }

  canvasAuthenticationPopUp() {
    this.waitForPageLoaded();
    const currentUrl = browser.getUrl();
    console.log(currentUrl);
    const authPart = "https://airdev:partners@";
    const split = currentUrl.slice(currentUrl.indexOf("c"));
    const authenticationUrl = authPart + split;
    console.log("authenticationUrl " + authenticationUrl);
    this.openNewWindow(authenticationUrl);
  }

  getCurrentWindowHandle() {
    return browser.getWindowHandle();
  }

  private regApp = this.checklistOption + "3";
  private regAppBtn = '//button[contains(text(), "Register")]';
  private connect = "#connect-link";

  private registerBtn = '//button[text()="Register"]';

  register() {
    this.refreshPage();
    this.click(this.regApp);
    this.click(this.regAppBtn);
  }

  registerApp() {
    this.refreshPage();
    this.click(this.regApp);
    this.click(this.regAppBtn);
    this.click(this.connect);
  }

  private verifyBtn = "//button[contains(text(), 'Verify')]";
  private closeBnt = "//button[contains(text(), 'Close')]";

  verifyReg() {
    this.click(this.verifyBtn);
    this.click(this.closeBnt);
  }

  private appName = this.checklistOption + "5";
  private saveChanges = '//button[text()="Save changes"]';

  addYourAppName() {
    this.click(this.appName);
    this.click(this.saveChanges);
  }

  private applogos = this.checklistOption + "6";
  private saveChangesLogos = '(//button[text()="Save changes"])[2]';

  addAppLogos() {
    this.click(this.applogos);
    this.click(this.saveChangesLogos);
  }

  private verify = '//button[text()="Verify"]';
  private closeSuccessPopUp = '//button[text()="Close"]';

  verifyAppIsRegistered() {
    if (this.isDisplayed(this.verify)) {
      this.click(this.verify);
    }
    if (this.isDisplayed(this.closeSuccessPopUp)) {
      this.click(this.closeSuccessPopUp);
    }
  }

  private extension = this.checklistOption + "8";
  private closePopUp = '//button[text()="Close popup"]';
  private installExtension = '//button[text()="Install extension"]';

  toggleOnInstallCanvasExtension() {
    let currentTab = this.getCurrentWindowHandle();
    this.click(this.extension);
    if (this.isClickable(this.closePopUp)) {
      this.click(this.closePopUp);
    } else if (this.isClickable(this.installExtension)) {
      this.click(this.installExtension);
      this.switchBackToPreviousTab(currentTab);
      this.click(this.launchChecklist);
      this.refreshPage();
      this.click(this.extension);
      if (this.isClickable(this.closePopUp)) {
        this.click(this.closePopUp);
      } else if (this.isClickable(this.installExtension)) {
        this.click(this.installExtension);
        this.switchBackToPreviousTab(currentTab);
        this.click(this.launchChecklist);
        this.refreshPage();
        this.click(this.extension);
        if (this.isClickable(this.closePopUp)) {
          this.click(this.closePopUp);
        } else if (this.isClickable(this.installExtension)) {
          this.click(this.installExtension);
          this.switchBackToPreviousTab(currentTab);
          this.click(this.launchChecklist);
          this.refreshPage();
          this.click(this.extension);
        } else {
          console.log("Canvas extension is not toggeled on!");
        }
      } else {
        console.log("Canvas extension is not toggeled on!");
      }
    } else {
      console.log("Canvas extension is not toggeled on!");
    }
  }

  private navigation = this.checklistOption + "9";
  private chevronUp =
    '(//*[@class="feather feather-chevron-up"])[2]/parent::div/parent::div/parent::div/parent::div/parent::div';
  private launchChecklist =
    '//*[text()="LAUNCH CHECKLIST"]/parent::div/parent::div/button';

  updateNavigation() {
    this.click(this.navigation);
    this.click(this.chevronUp);
    this.click(this.launchChecklist);
  }

  private updateLogBranding = '//*[text()="Update log in page branding"]';
  private backgroundType =
    '//*[text()="Select log in page background type"]/parent::div/parent::div/parent::div/parent::div//select';

  private saveLogChanges = '(//button[text()="Save changes"])[3]';

  updateLog(type: string) {
    this.click(this.updateLogBranding);
    this.select(this.backgroundType, type);
    this.click(this.saveLogChanges);
  }

  private defaultSeo = this.checklistOption + "11";
  private socialTitleInput =
    '//*[text()="SEO / social title (keep under 60 characters)"]/parent::div/parent::div/parent::div/parent::div//input[@class="bubble-element Input"]';

  updateDefaultSeo() {
    this.click(this.defaultSeo);
    this.type(this.socialTitleInput, Utility.getRandomId("Social-title "));
    this.click(this.saveChanges);
  }

  private appsDev = this.checklistOption + "12";
  private readDocumentation = '//*[text()="Read documentation"]';

  learnAboutAppsDevelopment() {
    this.click(this.appsDev);
    let currentTab = this.getCurrentWindowHandle();
    this.click(this.readDocumentation);
    this.switchBackToPreviousTab(currentTab);
  }

  private outgoingEmail = this.checklistOption + "4";

  enableOutgoingEmail() {
    this.click(this.outgoingEmail);
    console.log("To implemet API should be available for Basic license!!!");
  }
}

export default new AdminPortalPage();
