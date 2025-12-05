import { Given, When, Then } from "@cucumber/cucumber";

Given("I am a new user", function () {
  console.log("User is new");
});

When("I register with a valid email and password", function () {
  console.log("Registering user...");
});

Then("I should see a confirmation message", function () {
  console.log("Confirmation message displayed");
});

Given("I am a registered user", function () {
  console.log("User exists in system");
});

When("I log in with correct credentials", function () {
  console.log("Logging in successfully...");
});

Then("I should be redirected to my dashboard", function () {
  console.log("Dashboard displayed");
});

When("I log in with incorrect credentials", function () {
  console.log("Login failed");
});

Then("I should see an error message", function () {
  console.log("Error message displayed");
});
