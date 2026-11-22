import { homePage, NAV_LINKS } from "../../pages";

describe("ComedyOragon smoke", () => {
  it("loads home and nav", () => {
    homePage.visit();
    NAV_LINKS.filter((l) => l !== "Home").forEach((label) =>
      homePage.nav.link(label).should("be.visible")
    );
    homePage.nav.bookUsButton().should("be.visible");
  });
});
