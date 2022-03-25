import AbstractPage from "../pages/AbstractPage";

class LoginPage extends AbstractPage {
  private loginBtn = "//button[.='Log in']";
  private inputUsername =
    "(//div[text()='Email']//parent::div//parent::div//parent::div//parent::div//input[@type='email'])[2]";
  private inputPassword =
    "(//div[text()='Password']//parent::div//parent::div//parent::div//parent::div//input[@type='password'])[2]";
  private btnSubmit =
    "//div[text()='Email']//parent::div//parent::div//parent::div//parent::div//button[.='Log in']";

  get loginButton() {
    return $(this.loginBtn);
  }

  login(username: string, password: string) {
    this.click(this.loginBtn);
    this.type(this.inputUsername, username, false);
    this.type(this.inputPassword, password, false);
    this.click(this.btnSubmit);
  }

  open() {
    return super.open("login");
  }
  
}

export default new LoginPage();
