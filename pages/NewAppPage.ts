import AbstractPage from "./AbstractPage";
import Utility from "../utility/Utility";

class NewAppPage extends AbstractPage {
  private name =
    // '//*[text()="Name of this new app"]/parent::div/parent::div/parent::div/parent::div//input[@type="input"]';
    '//*[text()="Name of this new app"]/parent::div//input[@type="input"]'

  private template = '//*[text()="Canvas Base Template"]/parent::select';
  private appKind =
    '//*[text()="Marketplace, social network, SaaS..."]/parent::select';
  private customer =
    // "//*[text()='Is it customer-facing or internal?']/parent::div/parent::div/parent::div/parent::div//select";
    "//*[text()='Is it customer-facing or internal?']/parent::div//select";
  private templateDropDown =
    '//*[text()="Canvas Base Template"]/parent::select';
  private goal = "//*[text()='Build a tool for myself']/parent::select";

  private createBtn = '//button[text()="Create a new app"]';
  private createBtn2 =
    '//*[@class="bubble-element CustomElement"]//button[text()="Create a new app"]';
  private assistant = '//*[text()="Close the assistant"]';
  private watchVideo = '//*[text()="Watch video"]';
  private overlay = '//*[text()="Close the assistant"]';

  private details =
    // '//*[text()="Details of what you\'re building"]/parent::div/parent::div/parent::div/parent::div//input';
    '//*[text()="Details about your app (optional)"]/parent::div//input';

  private videoPopup = 
    '//*[@class="modal-popup video-panel-popup"]//div[@class="fa fa-close btn-close"]';

  fillOutNewAppForm() {
    const appName = this.type(this.name, Utility.getRandomId("autotest-"));
    this.select(this.appKind, "CRM");
    this.select(this.customer, "Internal or employee-facing");
    this.select(this.templateDropDown, "Canvas Base Template");
    this.type(this.details, Utility.getRandomId("I am building "));
    this.select(this.goal, "Build a tool for myself");
    this.click(this.createBtn);
    return appName;
  }

  private iframe = "#canvasOverlay";
  private cross =
    '//*[text()="Canvas by AirDev"]//parent::head//parent::html//*[@class="feather feather-x"]//parent::div//parent::div//parent::div//parent::div//parent::div[@class="bubble-element Group clickable-element"]';

  closePopUp() {
    this.refreshPage();
    if (this.isDisplayed(this.iframe)) {
      this.switchToIframe(this.iframe);
      this.click(this.cross);
      this.switchToParentIframe();
    }
    if (this.isDisplayed(this.assistant)) {
      console.log("Closing assistant block......");
      this.click(this.assistant);
    }
    if (this.isDisplayed(this.videoPopup))
      this.click(this.videoPopup);
  }
}

export default new NewAppPage();
