import { contactPage } from "../../pages";

describe("Contact page", () => {
  beforeEach(() => contactPage.visit());

  it("shows the Contact heading", () => {
    contactPage.pageHeading().should("be.visible");
  });

  it("shows the contact details card", () => {
    contactPage.detailsHeading().should("be.visible");
    // The values are placeholders today, so check the shape, not the text.
    contactPage.emailLink()
      .should("be.visible")
      .invoke("text")
      .should("match", /\S+@\S+\.\S+/);
    contactPage.websiteLink()
      .should("be.visible")
      .and("have.attr", "href")
      .and("match", /^https?:\/\//);
  });
});
