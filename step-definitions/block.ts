import { Given, When, Then, setDefinitionFunctionWrapper } from "@cucumber/cucumber";
import CanvasExtension from "../extension/CanvasExtension";
import { assertTrue } from "../assert/Assert";

When(/^I search (.+) and add block (.+)$/, (block, search) => {
  // TODO
});

Then(/^Block is added (.+)$/, (expected_element) => {
  assertTrue(CanvasExtension.isExpectedBlockElement(expected_element));
});