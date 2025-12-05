import { Given, When, Then } from "@cucumber/cucumber";

Given('I am on the {string} page', function (page) {
  console.log(`Navigating to ${page} page`);
});

When('I fill in the lost item form correctly', function () {
  console.log("Filling in item name, description, date, and location...");
});

When('I submit the form', function () {
  console.log("Submitting the lost item form...");
});

Then('I should see a confirmation message {string}', function (message) {
  console.log(`Displaying message: ${message}`);
});

Then('I should see my new post displayed in the feed', function () {
  console.log("Post appears in feed.");
});
