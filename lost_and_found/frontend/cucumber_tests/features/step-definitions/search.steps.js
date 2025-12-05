import { Given, When, Then } from "@cucumber/cucumber";

Given('I am on the home page', function () {
  console.log("Opening home page...");
});

When('I type {string} into the search bar', function (keyword) {
  console.log(`Typing keyword: ${keyword}`);
});

When('I submit the search', function () {
  console.log("Submitting search...");
});

Then('I should see results containing {string}', function (keyword) {
  console.log(`Checking that results contain: ${keyword}`);
});
