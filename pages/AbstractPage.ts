export default class AbstractPage {
  open(path: string) {
    // browser.launchChromeApp('apmembkcpmjhmecifhckdidppfoiajie') // Google Docs (https://chrome.google.com/webstore/detail/canvas-by-airdev/apmembkcpmjhmecifhckdidppfoiajie)
    return browser.url("/");
  }

  openNewWindow(url: string) {
    browser.newWindow(url);
  }

  openNewUrl(url: string) {
    browser.url(url);
  }

  close() {
    browser.shutdown();
  }

  reloadSession() {
    browser.reloadSession();
  }

  private timing: number = 110000;
  private tries: number = 0;

  pause(milliseconds: number) {
    browser.pause(milliseconds);
  }

  getTitle() {
    this.waitForPageLoaded();
    return browser.getTitle();
  }

  isClickable(selector: string) {
    this.waitForPageLoaded();
    try {
      return $(selector).waitForClickable({
        reverse: false,
        timeout: 5000,
        interval: 5,
      });
    } catch (e) {
      console.log(
        e + " Element " + selector + " is not clickable, continue test ...",
      );
      return false;
    }
  }

  click(locator: string) {
    this.waitForPageLoaded();
    browser.setTimeout({ implicit: this.timing });
    try {
      let element = $(locator);
      element.waitForExist({ timeout: this.timing, interval: this.tries });
      element.waitForDisplayed({ timeout: this.timing, interval: this.tries });
      element.waitForClickable({ timeout: this.timing, interval: this.tries });
      element.click();
      console.log("Element " + locator + " is clicked");
    } catch (e) {
      console.log(e + " Element " + locator + " is not clicked");
    }
  }

  hover(locator: string) {
    this.waitForPageLoaded();
    browser.setTimeout({ implicit: this.timing });
    let element;
    try {
      element = $(locator);
      element.waitForExist({ timeout: this.timing, interval: this.tries });
      element.moveTo();
      console.log("Hover over " + locator);
    } catch (e) {
      console.log(e + " Hover over " + locator + " didn't work out");
    }
  }

  type(locator: string, text: string, log: boolean = true) {
    this.waitForPageLoaded();
    browser.setTimeout({ implicit: this.timing });
    try {
      let element = $(locator);
      element.waitForExist({ timeout: this.timing, interval: this.tries });
      element.waitForDisplayed({ timeout: this.timing, interval: this.tries });
      element.waitForClickable({ timeout: this.timing, interval: this.tries });
      element.setValue(text);
      if (log === true)
        console.log("Typig " + text + " into element" + locator);
    } catch (e) {
      console.log(e + "Could not type " + text + "into element" + locator);
    }
    return text;
  }

  key(value: string) {
    this.waitForPageLoaded();
    try {
      browser.keys(value);
      console.log("Key " + value + " is pressed");
    } catch (e) {
      console.log(e + " Element " + value + " is not pressed");
    }
  }

  scrollToElem(locator: string) {
    this.waitForPageLoaded();
    try {
      let element = $(locator);
      element.waitForExist({ timeout: this.timing, interval: this.tries });
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
      console.log("Scroll to element " + locator);
    } catch (e) {
      console.log(e + "Couldn't scroll to element " + locator);
    }
  }

  waitForPageLoaded() {
    try {
      browser.setTimeout({ pageLoad: this.timing });
      const state = browser.execute("return document.readyState");
      browser.waitUntil(() => state === "complete", {
        timeout: this.timing,
        interval: this.tries,
      });
    } catch (e) {
      console.log(
        e +
          " Page is not loaded completely or timeout is reached " +
          this.timing +
          "secs ... ",
      );
    }
  }

  waitForUrlToBe(url: string) {
    browser.setTimeout({ implicit: this.timing, pageLoad: this.timing });
    browser.waitUntil(() => browser.getUrl() === url, {
      timeout: this.timing,
      interval: this.tries,
    });
  }

  getAllHandles() {
    this.waitForPageLoaded();
    let handles: Array<string>;
    try {
      handles = browser.getWindowHandles();
      console.log("handles: " + handles);
    } catch (e) {
      console.log(e + " failed getting handles ");
    }
    return handles;
  }

  switchToNewTab(handles: Array<string>) {
    this.waitForPageLoaded();
    try {
      let currentHandle = browser.getWindowHandle();
      for (let i = 0; i < handles.length; i++) {
        if (handles[i] != currentHandle) {
          browser.switchToWindow(currentHandle);
          console.log("Switched to " + currentHandle);
          break;
        }
      }
    } catch (e) {
      console.log(e + " failed to switch ");
    }
  }

  switchToTab(currentTab: string) {
    let newTab: string;
    this.waitForPageLoaded();
    try {
      let handles: Array<string> = browser.getWindowHandles();
      for (let i = 0; i < handles.length; i++) {
        if (handles[i] != currentTab) {
          newTab = handles[i];
          console.log("Switched to " + newTab);
          browser.switchToWindow(newTab);
          break;
        }
      }
    } catch (e) {
      console.log(e + "Could not switch to new tab " + newTab);
    }
  }

  switchBackToPreviousTab(previousTab: string) {
    this.waitForPageLoaded();
    try {
      browser.switchToWindow(previousTab);
    } catch (e) {
      console.log(e + "Could not switch to new tab " + previousTab);
    }
  }

  switchToLastTab(parentTab: string, currentTab: string) {
    let newTab: string;
    this.waitForPageLoaded();
    try {
      let handles: Array<string> = browser.getWindowHandles();
      for (let i = 0; i < handles.length; i++) {
        if (handles[i] != parentTab && handles[i] != currentTab) {
          newTab = handles[i];
          browser.switchToWindow(newTab);
          console.log("Switched to " + newTab);
          break;
        }
      }
    } catch (e) {
      console.log(e + "Could not switch to new tab " + newTab);
    }
  }

  waitForNewTabToBeOpen(handles: Array<string>) {
    this.waitForPageLoaded();
    browser.setTimeout({ implicit: 10000, pageLoad: 10000 });
    let tabs: number;
    try {
      do {
        this.pause(2000);
        console.log();
        tabs = browser.getWindowHandles().length;
        console.log("wait for tabs to be = " + tabs + " > " + handles.length);
        browser.waitUntil(() => tabs > handles.length, {
          timeout: 10000,
          interval: this.tries,
        });
      } while (tabs < handles.length);
    } catch (e) {
      console.log(e + " wait for tabs failed = " + tabs);
    }
  }

  switchToLastOneTab(handles1: Array<string>) {
    let newTab: string;
    this.waitForPageLoaded();
    this.waitForNewTabToBeOpen(handles1);
    try {
      let handles2: Array<string> = browser.getWindowHandles();
      console.log("handles2 = " + handles2);
      let missing = handles2.filter((item) => handles1.indexOf(item) < 0);
      console.log("missing = " + missing);
      for (let i = 0; i < missing.length; i++) {
        newTab = missing[i];
        browser.switchToWindow(newTab);
        console.log("Switched to " + newTab);
      }
    } catch (e) {
      console.log(e + "Could not switch to new tab " + newTab);
    }
  }

  switchToTabByNumber(tabNumber: number) {
    let handles: Array<string>;
    let newTab: string;
    this.waitForPageLoaded();
    try {
      handles = browser.getWindowHandles();
      newTab = handles[tabNumber];
      browser.switchToWindow(newTab);
      console.log("Switched to " + newTab);
    } catch (e) {
      console.log(e + "Could not switch to new tab " + newTab);
    }
  }

  getCurrentWindowHandle() {
    this.waitForPageLoaded();
    return browser.getWindowHandle();
  }

  switchToWindow(title: string) {
    this.waitForPageLoaded();
    browser.switchWindow(title);
  }

  refreshPage() {
    this.waitForPageLoaded();
    try {
      browser.execute("$(window).off('beforeunload');");
      browser.refresh();
      console.log("Page is reloaded");
      this.waitForPageLoaded();
    } catch (e) {
      console.log(e + "Page is not reloaded");
    }
  }

  reloadPage() {
    this.waitForPageLoaded();
    try {
      browser.execute("$(window).off('beforeunload');");
      browser.reload();
      console.log("Page is reloaded");
      this.waitForPageLoaded();
    } catch (e) {
      console.log(e + "Page is not reloaded");
    }
  }

  switchToIframe(locator: string) {
    this.waitForPageLoaded();
    let element;
    try {
      element = $(locator);
      element.waitForExist({ timeout: this.timing, interval: this.tries });
      element.waitForDisplayed({ timeout: this.timing, interval: this.tries });
      browser.switchToFrame(element);
      console.log("Switched to " + locator);
    } catch (e) {
      console.log(e + " Could not switch to " + locator);
    }
  }

  switchToParentIframe() {
    this.waitForPageLoaded();
    try {
      browser.switchToParentFrame();
      console.log("Switched to parent iFrame ");
    } catch (e) {
      console.log(e + " Could not switch to parent iFrame ");
    }
  }

  findElement(selector: string) {
    this.waitForPageLoaded();
    // browser.setTimeout({ implicit: this.timing });
    let elem;
    try {
      elem = $(selector);
    } catch (e) {
      console.log(e + " " + selector + " element not found");
    }
    return elem;
  }

  isVisible(selector: string) {
    let elem = this.findElement(selector);
    try {
      if (elem.isClickable() && elem.isDisplayed()) {
        return true;
      }
    } catch (e) {
      console.log(e + " Element is not visible...");
      return false;
    }
    return false;
  }

  isExisting(selector: string) {
    this.waitForPageLoaded();
    let elem = $(selector);
    try {
      let status = elem.waitForExist({
        reverse: false,
        timeout: 5000,
        interval: 3,
      });
      // TODO: fix infinite loop, function calls itself if false?
      if (elem.isExisting() && status === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(
        e + " Element " + selector + " is not clickable, continue test ...",
      );
      return false;
    }
  }

  isNotExisting(selector: string) {
    this.waitForPageLoaded();
    browser.setTimeout({ implicit: 10000 });
    let status = $(selector).isDisplayed();
    if (status) {
      return false;
    } else {
      return true;
    }
  }

  isDisplayed(selector: string) {
    this.waitForPageLoaded();
    let elem = this.findElement(selector);
    try {
      let status = elem.waitForClickable({
        reverse: false,
        timeout: 5000,
        interval: 3,
      });
      // console.log("status = " + status);
      if (elem.isClickable() && status === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(
        e + " Element " + selector + " is not clickable, continue test ...",
      );
      return false;
    }
  }

  select(selector: string, visibleText: string) {
    this.waitForPageLoaded();
    try {
      let element = $(selector);
      element.selectByVisibleText(visibleText);
      console.log(
        "Element " + selector + " is selected by text " + visibleText,
      );
    } catch (e) {
      console.log(
        e + "Element " + selector + " is not selected by " + visibleText,
      );
    }
  }

  zoom(percent: number) {
    browser.setTimeout({ implicit: this.timing, pageLoad: this.timing });
    const state = browser.execute(
      "document.body.style.zoom='" + percent + "%'",
    );
  }

  getText(selector: string) {
    this.waitForPageLoaded();
    let element = $(selector);
    return element.getText();
  }
}
