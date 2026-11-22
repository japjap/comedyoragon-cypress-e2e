import { homePage, NAV_LINKS } from "../../pages";

describe("Home page", () => {
  beforeEach(() => homePage.visit());

  it("shows a heading", () => {
    homePage.heading().should("be.visible").and("not.be.empty");
  });

  it("shows every nav link", () => {
    NAV_LINKS.forEach((label) => homePage.nav.link(label).should("be.visible"));
  });

  it("shows the Book Us and Ask us buttons", () => {
    homePage.nav.bookUsButton().should("be.visible");
    homePage.nav.askUsButton().should("be.visible");
  });
});
