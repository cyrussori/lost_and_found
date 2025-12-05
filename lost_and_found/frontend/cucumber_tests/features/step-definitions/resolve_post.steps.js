import { Given, When, Then } from "@cucumber/cucumber";

Given('I am viewing one of my lost item posts', function () {
  console.log("Viewing user post...");
});

When('I click the {string} button', function (buttonText) {
  console.log(`Clicking button: ${buttonText}`);
});

Then('the post should display a {string} badge', function (badgeText) {
  console.log(`Checking that badge '${badgeText}' is visible.`);
});
