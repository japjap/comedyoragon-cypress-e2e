import { showsPage } from "../../pages";

describe("Shows page", () => {
  beforeEach(() => showsPage.visit());

  it("shows a heading", () => {
    showsPage.heading().should("be.visible");
  });

  // Skipped by default: the list can legitimately be empty between seasons.
  it.skip("lists at least one show", () => {
    showsPage.shows().should("have.length.greaterThan", 0);
  });
});
