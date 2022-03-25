import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const pages = {
  login: LoginPage,
  home: HomePage,
};

Then(/^I click (.*) button and log out$/, (menu) => {
  HomePage.logOut();
});

Then(/^I redirected to Login Page and see Login button$/, () => {
  expect(LoginPage.loginButton).toBeExisting();
});
