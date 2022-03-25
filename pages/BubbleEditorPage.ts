import AbstractPage from "./AbstractPage";
import { Iframe } from "../iframe/Iframe";



class BubbleEditorPage extends AbstractPage {
  private data = '//div[@class="main-tab-bar"]//*[text()="Data"]';
  private appData = '//*[text()="App data"]';
  private allUsers = '//*[text()="All Users"]';
  private allSettings = '//*[@class="views-list"]//*[contains(text(), "App settings")]';
  private modifyBtn = "//*[@class='cell-btn-wrapper']//*[@class='bubble-ui modify-btn']";
  private runAsBtn = ".run-as-btn";

  title() {
    return this.getTitle();
  }

  runAsAdminUser() {
    this.click(this.data);
    if (this.isClickable(this.appData)) {
      this.click(this.appData);
    } else {
      this.switchToIframe(this.iframe);
      this.click(this.watchVideo);
      this.click(this.cross);
      this.switchToParentIframe();
      this.click(this.appData);
    }
    this.click(this.allUsers);
    if (this.isClickable(this.runAsBtn)) {
      this.click(this.runAsBtn);
    } else {
      this.switchToIframe(this.iframe);
      this.click(this.watchVideo);
      this.click(this.cross);
      this.switchToParentIframe();
      this.click(this.runAsBtn);
    }
    this.click(this.runAsBtn);
  }

  openCanvasAppDB() {
    this.click(this.data);
    if (this.isClickable(this.appData)) {
      this.click(this.appData);
    } else {
      this.switchToIframe(this.iframe);
      this.click(this.watchVideo);
      this.click(this.cross);
      this.switchToParentIframe();
      this.click(this.appData);
    }
    this.click(this.allSettings);
    this.click(this.modifyBtn);
  }

  private urlField = "body > div.modal-popup.modify-db-entry > div > div.children > div > div.panel > div.field-list > div:nth-child(13) > textarea";
  private saveBtn = "//div[@class='btn btn-create bubble-ui']";
  private gotItBtn = "//div[contains(text(), 'GOT IT')]";


  changeSiteBaseUrl() {
    let newUrl = this.type(this.urlField, "https://canvas.airdev.co/version-test");
    this.click(this.saveBtn);
    this.click(this.gotItBtn);
  }

  private settings: string = '//*[text()="Settings"]';

  openSettings() {
    if (!this.isDisplayed(this.settings) && this.isDisplayed(this.iframe)) {
      console.log("Settings One...");
      this.switchToIframe(this.iframe);
      this.click(this.watchVideo);
      this.click(this.cross);
      this.switchToParentIframe();
      if (this.isDisplayed(this.settings)) {
        console.log("Settings Two...");
        this.click(this.settings);
      }
    } else if (
      this.isDisplayed(this.settings) &&
      !this.isDisplayed(this.iframe)
    ) {
      console.log("Settings Three...");
      this.click(this.settings);
    } else {
      console.log("Pop up is not handled...");
    }
  }

  private plugins: string = '//*[text()="Plugins"]';

  openPlugins() {
    this.click(this.plugins);
  }

  private pickPlan = ".pick-plan .spot";
  private confirmChange = '//*[text()="Confirm change"]';
  private confirmBtnPopUp = ".btn-create";

  changeToPlan(plan: string) {
    this.click(this.pickPlan);
    let elem = '//*[text()="' + plan + '"]';
    this.click(elem);
    this.click(this.confirmChange);
    this.click(this.confirmBtnPopUp);
    this.click(this.confirmBtnPopUp);
  }

  getCurrentWindowHandle() {
    this.waitForPageLoaded();
    return browser.getWindowHandle();
  }

  private watchVideo = '//*[text()="Watch video"]';
  private iframe = "#canvasOverlay";
  private cross =
    '//*[text()="Canvas by AirDev"]//parent::head//parent::html//*[@class="feather feather-x"]//parent::div//parent::div//parent::div//parent::div//parent::div[@class="bubble-element Group clickable-element"]';

  closePopUp(tab: string) {
    console.log("closing pop up...");
    let design = '//*[text()="' + tab + '"]';
    console.log(this.isDisplayed(design));
    let displayed: boolean;
    do {
      displayed = this.isDisplayed(design);
      console.log("displayed = " + displayed);
    } while (displayed !== true);
    if (displayed) {
      this.click(design);
    } else {
      this.switchToIframe(this.iframe);
      if (this.isDisplayed(this.watchVideo)) {
        this.click(this.watchVideo);
        this.click(this.cross);
      }
      this.switchToParentIframe();
      this.click(design);
    }
  }


  private generalTab = "//div[@class='tab-caption general']";

  openGeneralTab() {
    this.click(this.generalTab);
  }


  private inputUsername = "//input[@class='TextBox property-editor-control empty bubble-ui field username']";
  private inputPass = "//input[@class='TextBox property-editor-control empty bubble-ui field password']";

  setNameAndPass() {
    this.type(this.inputUsername, 'username');
    this.type(this.inputPass, 'password');
  }


}

export default new BubbleEditorPage();
