export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '.error-message';
    this.userNameDisplay = '.navbar-user-name';
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login');
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.page.textContent(this.errorMessage);
  }

  async getDisplayedUserName() {
    return this.page.textContent(this.userNameDisplay);
  }
}
