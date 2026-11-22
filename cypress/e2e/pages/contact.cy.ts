import { contactPage } from "../../pages";

describe("Contact page", () => {
  beforeEach(() => contactPage.visit());

  it("shows the contact form", () => {
    contactPage.nameInput().should("be.visible");
    contactPage.emailInput().should("be.visible");
    contactPage.messageInput().should("be.visible");
    contactPage.submitButton().should("be.enabled");
  });
});
