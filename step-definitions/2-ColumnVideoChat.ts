import { Given, When, Then } from "@cucumber/cucumber";
import VideoChat from "../locators/2-ColumnVideoChatPage/2-ColumnVideoChatPage"

Then(/^Page (.+) is added$/, (page) => {
  expect(VideoChat.joinVideoChat).toBeExisting();
});
