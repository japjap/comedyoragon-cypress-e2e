import { comediansPage } from "../../pages";

describe("Comedians page", () => {
  beforeEach(() => comediansPage.visit());

  it("lists comedians", () => {
    comediansPage.cards().should("have.length.greaterThan", 0);
  });

  it("gives each comedian a name heading", () => {
    comediansPage.cards().each(($card) => {
      cy.wrap($card).find("h2, h3").should("not.be.empty");
    });
  });
});
