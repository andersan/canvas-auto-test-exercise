import { Given, When, Then } from "@cucumber/cucumber";
import BubbleEditorPage from "../pages/BubbleEditorPage";
import NewAppPage from "../pages/NewAppPage";
import Environment from "../Environment";


const pages = {
  bubble: BubbleEditorPage,
};

When(/^I open Settings tab$/, () => {
  BubbleEditorPage.openSettings();
});

Then(/^I change to the (\w+) plan$/, (plan) => {
  BubbleEditorPage.changeToPlan(plan);
});


When(/^I go to the General tab$/, () => {
  BubbleEditorPage.openGeneralTab();
});

Then(/^I set password and username$/, () => {
  BubbleEditorPage.setNameAndPass();
});

