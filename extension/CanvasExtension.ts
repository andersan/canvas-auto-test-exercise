import AbstractPage from "../pages/AbstractPage";
import Utility from "../utility/Utility";
import { Iframe } from "../iframe/Iframe";
import { Extension } from "typescript";

class CanvasExtension extends AbstractPage {

  // https://chrome.google.com/webstore/detail/canvas-by-airdev/apmembkcpmjhmecifhckdidppfoiajie?hl=en

  backToBubbleEditorTab() {
    this.switchToTabByNumber(0);
    this.refreshPage();
  }

  bubbleTestMode() {
    const currentUrl = browser.getUrl();
    console.log(currentUrl);
    const testPart = "&canvas-version=test";
    const authenticationUrl = currentUrl + testPart;
    console.log("authenticationUrl " + authenticationUrl);
    this.openNewUrl(authenticationUrl);
    this.refreshPage();
    this.waitForPageLoaded();
  }

  reload() {
    this.reloadSession();
  }

  private watchVideo = '//*[text()="WatchVideo"]';
  private greyout = ".main-page.bubble-element.Page";

  openCanvasExtension() {
    console.log("Opening chrome extension");
    if (this.isDisplayed(Iframe.ExtensionIframe)) {
      console.log("Chrome extension already open");
      return;
    }
    // TODO: create a new way to open canvas extension. 
    // currently, have to modify content script to load and open automatically when a new ext. version is added to the test suite.
  }

  private addNewPageBtn =
    '//*[text()="Pages"]/parent::div/parent::div/parent::div/parent::div';
  private addStandardPage =
    '//*[text()="Standard Portal / Dashboard Page"]/parent::div/parent::div/parent::div/parent::div//button[text()="+ Add page"]';

  private createNewPage = '//*[text()="Create a new page"]';

  get pageName() {
    return $(".page-name");
  }

  switchToParentFrame() {
    this.switchToParentIframe();
  }

  switchToCanvasIframe() {
    this.switchToIframe(Iframe.ExtensionIframe);
  }

  addNewPage(pageName: string) {
    this.switchToCanvasIframe();
    this.click(this.addNewPageBtn);
    this.pause(3000);
    this.type(this.searchBox, pageName);
    this.pause(3000);
    this.key("Enter");
    let page =
      '//*[text()="' +
      pageName +
      '"]/parent::div/parent::div/parent::div/parent::div//button[text()="+ Add page"]';
    this.hover(page);
    this.click(page);
    let newPageName = Utility.getRandomId("autotest");
    let pagePathInput =
      '//font[text()="' +
      pageName +
      '"]/parent::strong/parent::div/parent::div/parent::div/parent::div/parent::div//input[@type="input"]';
    this.type(pagePathInput, newPageName);
    this.click(this.createNewPage);
    this.switchToParentIframe();
    this.switchToIframe(Iframe.СanvasIframe);
    this.waitForPastingPage();
    this.switchToParentIframe();
    return newPageName;
  }

  private backHomeBtn = '//*[text()="Back to home"]';

  backToHome() {
    this.switchToIframe(Iframe.ExtensionIframe);
    this.click(this.backHomeBtn);
    this.switchToParentIframe();
  }

  warningMessage(text: string) {
    return $('//*[text()="' + text + '"]');
  }

  addPage(pageId: number) {
    const page = '(//button[text()="+ Add page"])[' + pageId + "]";
    this.click(page);
  }

  addAllPages(page: number) {
    this.switchToIframe(Iframe.ExtensionIframe);
    let pageId: number;
    this.click(this.addNewPageBtn);
    for (let i = page; i <= 24; i++) {
      pageId = i;
      const page = '(//button[text()="+ Add page"])[' + pageId + "]";
      this.scrollToElem(page);
      this.click(page);
      this.type(this.input, Utility.getRandomId(pageId + ""));
      this.click(this.createNewPage);
      this.switchToParentIframe();
      this.switchToIframe(Iframe.СanvasIframe);
      this.waitForPastingPage();
      this.switchToParentIframe();
      this.switchToIframe(Iframe.ExtensionIframe);
      this.closeViewInstructions();
    }
  }

  clickAddNewPage() {
    this.switchToIframe(Iframe.ExtensionIframe);
    this.click(this.addNewPageBtn);
  }

  addPages(pageId: number) {
    const page = '(//button[text()="+ Add page"])[' + pageId + "]";
    this.scrollToElem(page);
    this.click(page);
    this.type(this.input, Utility.getRandomId(pageId + ""));
    this.click(this.createNewPage);
    this.switchToParentIframe();
    this.switchToIframe(Iframe.СanvasIframe);
    this.waitForPastingPage();
    this.switchToParentIframe();
    this.switchToIframe(Iframe.ExtensionIframe);
    this.closeViewInstructions();
  }

  private pastingPage = '//*[contains(text(), "Pasting page")]';

  waitForPastingPage() {
    console.log("Waiting for page to be pasted... ");
    let display: boolean;
    do {
      display = this.isDisplayed(this.pastingPage);
      // console.log("display = " + display);
    } while (display);
    console.log("Page is pasted... ");
  }

  private viewInstructions =
    '//*[text()="View instructions"]/parent::div/parent::div/parent::div//*[@class="feather feather-x"]/parent::div/parent::div/parent::div/parent::div/parent::div';

  closeViewInstructions() {
    do {
      if (this.isDisplayed(this.viewInstructions)) {
        this.click(this.viewInstructions);
        do {
          let popUp = this.isDisplayed(this.viewInstructions);
        } while (popUp);
        console.log("View Instructions is not present");
      }
    } while (this.isDisplayed(this.viewInstructions));
    console.log("View Instructions is not present, continue test...");
  }

  private input = 'input[placeholder="e.g., pricing"]';

  typePageName(text: string) {
    this.type(this.input, Utility.getRandomId(text));
  }


  // TODO: set these XPaths
  private addblockToPageBtn = '';
  private searchBox = '[placeholder="Search by keyword"]';
  private pastingBlock = '//*[contains(text(), "Pasting")]';

  addBlock(search: string, blockName: string) {
    // TODO: implement this method
  }

  private propertyEditor = ".property-editor-2>div>.close-button";

  closePropertyEditor() {
    console.log("Closing property editor...");
    if (this.isDisplayed(this.propertyEditor)) {
      this.click(this.propertyEditor);
      console.log("Property editor is closed.");
    } else {
      console.log("Property Editor was not present, continue test...");
    }
  }

  waitForPastingBlock() {
    console.log("Waiting for block to be pasted... ");
    let display: boolean;
    do {
      display = this.isDisplayed(this.pastingBlock);
      console.log("display = " + display);
    } while (display !== false);
    console.log("Block is pasted... ");
  }

  isExpectedBlockElement(text: string) {
    let elem = '(//*[contains(text(), "' + text + '")])[1]';
    console.log("Waiting for elem to be present... ");
    let display: boolean;
    do {
      display = this.isDisplayed(elem);
    } while (!display);
    console.log("BlockElement is present. ");
    return display;
  }

  get targetGroupMissing() {
    return $("//*[text()='Target group is missing']");
  }

  private missingGroup = "Target group is missing";

  clickAddBlockToPage() {
    this.switchToCanvasIframe();
    this.click(this.addblockToPageBtn);
  }


}

export default new CanvasExtension();
