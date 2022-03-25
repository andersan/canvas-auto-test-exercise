import AbstractPage from "../pages/AbstractPage";

class HomePage extends AbstractPage {
  get menu() {
    return $('//*[text()="Menu"]/parent::div/parent::div');
  }

  createNewApp(button: string) {
    let newAppBtn = '//button[text()="' + button + '"]';
    if (this.isDisplayed(newAppBtn)) {
      this.click(newAppBtn);
    }
      // fallback for when bubble account has 0 apps
    else if (this.isDisplayed('//button[text()="New application"]')) {
      this.click('//button[text()="New application"]');
    }
      // fallback in case both of the above fail and app has to wait (maybe button not loaded yet?)
    else {
      this.click(newAppBtn);
    }
  }

  private menuBtn = '//*[text()="Menu"]/parent::div/parent::div';
  private logOutBtn = '//*[text()="Log out"]';

  logOut() {
    this.click(this.menuBtn);
    this.click(this.logOutBtn);
  }

  private appName = "//*[contains(text(), 'autotest')]";
  private input =
    "//*[contains(text(), 'autotest')]/parent::div/parent::div/parent::div/parent::div/parent::div//input";
  private deleteMyAppBtn =
    "//*[contains(text(), 'I understand the consequences, delete my app')]"
  private copyInput =
    "//*[contains(text(), 'autotest')]/parent::div/parent::div/parent::div/parent::div//input[@placeholder='App copy']";
  private copyckb =
    "//*[contains(text(), 'Copy the application database content')]"; 
  private copyMyAppBtn =
    "//*[contains(text(), 'autotest')]/parent::div/parent::div/parent::div/parent::div//button[contains(text(), 'Copy')]"; 




  deleteApp(name: string) {
    let deleteBtn =
      "//*[contains(@href, '" +
      name +
      "')]//parent::div//button[@id='deletebtn']";
    this.click(deleteBtn);
    let appsName = this.type(this.input, this.getText(this.appName));
    this.click(this.deleteMyAppBtn);
    this.click(this.deleteMyAppBtn);
    return appsName;
  }


  isAppNotExisting(appName: string) {
    this.refreshPage();
    let elem: boolean;
    console.log("checking is app removed...");
    try {
      this.pause(5000);
      let deleteBtn =
        "//*[contains(@href, '" +
        appName +
        "')]//parent::div//button[@id='deletebtn']";
      console.log(deleteBtn);
      do {
        elem = this.isNotExisting(deleteBtn);
        console.log(elem);
      } while (!elem);
    } catch (e) {
      console.log(e + " elem is existing?");
    }
    return elem;
  }


  copyApp(name: string) {
    let copyBtn =
      "//*[contains(@href, '" +
      name +
      "')]//parent::div//button[@id='copybtn']";
    this.click(copyBtn);
    let subName = "//div[contains(text(), 'Name of this copy of ')]";
    let appsName = this.type(this.copyInput, this.getText(subName).slice(21, -1) + "-copy");
    this.pause(5000);
    this.click(this.copyckb);
    this.click(this.copyMyAppBtn);
    this.pause(5000);
    return appsName;
  }

  copySpecApp(name: string) {
    let copyBtn =
      "//*[contains(@href, '" +
      name +
      "')]//parent::div//button[@id='copybtn']";
    this.click(copyBtn);
    let subName = "//div[contains(text(), 'Name of this copy of ')]";
    let appsName = this.type(this.copyInput, this.getText(subName).slice(21, -1) + "-copy");
    this.pause(5000);
    this.click(this.copyckb);
    this.click(this.copyMyAppBtn);
    this.pause(5000);
    return appsName;
  }

}



export default new HomePage();
