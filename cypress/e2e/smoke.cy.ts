describe("ComedyOragon smoke", () => {
  it("loads home and nav", () => {
    cy.visit("/");
    ["About", "Comedians", "Shows", "Contact"].forEach((l) =>
      cy.contains("nav a", l).should("be.visible")
    );
    cy.contains("Book Us").should("be.visible");
  });
});