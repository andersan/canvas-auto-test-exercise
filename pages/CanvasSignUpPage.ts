  import Environment from "../Environment";
import AbstractPage from "./AbstractPage";

class CanvasSignUpPage extends AbstractPage {

  getCanvasPageWindowHandle() {
    browser.pause(10000);
    return this.getCurrentWindowHandle();
  }

  getAllPageCanvasHadles() {
    browser.pause(10000);
    return this.getAllHandles();
  }

  // switchToCanvasSignUpTab(parentTab: string, currentTab: string) {
  //   this.switchToLastTab(parentTab, currentTab);
  // }

  switchToCanvasSignUpTab(currentHandle: string) {
    this.switchToTab(currentHandle);
  }

  switchTo(currentHandle: string) {
    this.switchToLastOneTab(currentHandle);
  }

  getCanvasPageTitle() {
    this.waitForPageLoaded();
    let title = null;
    try {
      title = browser.getTitle();
      console.log("Page title = " + title);
    } catch (error) {
      console.log(error + "Could not get title");
    }
    return title;
  }

  login = '//font[text()="Log in"]';
  get email() {
    return $(
      '//button[text()="Log in"]/parent::div/parent::div/parent::div/parent::div//input[@type="email"]'
    );
  }
  get pass() {
    return $(
      '//button[text()="Log in"]/parent::div/parent::div/parent::div/parent::div//input[@type="password"]'
    );
  }
  loginBtn = '//button[text()="Log in"]';

  loginToCanvas() {
    // browser.url(
    //   "https://canvas.airdev.co//login?app=autotest-rrh9ksvfo&version=test&public_token=eb8dd0a9f962e9054a58ff0e7f97451afed5ec7ec8320929764717fcb9cecec9299f62095b1cb31fb2e9d3f147e956f4086b30da85d079d8c25979117ec1b97d&app_version=1619491399094x988701570915631100&m=signup"
    // );
    this.click(this.login);
    this.email.setValue(Environment.getVars()[0]);
    this.pass.setValue(Environment.getVars()[1]);
    this.click(this.loginBtn);
  }

  publicLoginToCanvas() {
    this.click(this.login);
    this.email.setValue(Environment.getVars()[2]);
    this.pass.setValue(Environment.getVars()[3]);
    this.click(this.loginBtn);
  }


  private regApp = '//button[text()="Register app"]';
  private appType = '(//select[@class="bubble-element Dropdown"])[1]';
  //   get appType1() {
  //     return $('(//select[@class="bubble-element Dropdown"])[1]');
  //   }

  private canvasFor = '(//*[@class="bubble-element Dropdown"])[2]';
  private canvas = ".bubble-element.Link.clickable-element.";

  registerApp() {
    this.select(this.canvasFor, "A startup");
    this.select(this.appType, "Marketplace");
    this.click(this.regApp);
  }

  private gotItBtn = '//button[text()="Got it"]';


  selectLicense(license: string) {
    let free =
      '//*[text()="' +
      license +
      '"]/parent::div/parent::div/parent::div/parent::div//*[text()="Choose this"]';
    this.click(free);
    this.click(this.gotItBtn);
  }

  private checkbox = "//div[contains(text(), 'app for my own personal or commercial use and not for a client')]";
  private purchaseBtn = "//button[text() = 'Purchase license for $149']";

  selectPremiumLicense(license: string) {
    let premium =
      '//*[text()="' +
      license +
      '"]/parent::div/parent::div/parent::div/parent::div//*[text()="Choose this"]';
    this.click(premium);
    this.click(this.checkbox);
    this.click(this.purchaseBtn);
    this.pause(5000);
  }


  private iputClientName = "//*[text()='Client name']/parent::div/parent::div/parent::div/parent::div//input";
  private purchase399Btn = "//button[text() = 'Purchase license for $399']";
  


  
  updateLicensePro() {
    let pro = "//*[text()='Professional']/parent::div/parent::div/parent::div/parent::div//*[text()='Upgrade']";
    this.click(pro);
    this.type(this.iputClientName, "Autotest");
    this.click(this.purchase399Btn);
    this.pause(5000);
  }

  private logOutBtn = "//button[contains(text(), 'Log out')]";

  signinToOwnerAcc() {
    this.click(this.logOutBtn);
  }

}

export default new CanvasSignUpPage();
