import { homePage, type NavLink } from "../../pages";

// GUESS: each nav label routes to the lower-case path.
const routes: Record<Exclude<NavLink, "Home">, string> = {
  About: "/about",
  Comedians: "/comedians",
  Shows: "/shows",
  Contact: "/contact",
};

describe("Navigation", () => {
  (Object.keys(routes) as (keyof typeof routes)[]).forEach((label) => {
    it(`goes to ${label}`, () => {
      homePage.visit();
      homePage.nav.goTo(label);
      cy.location("pathname").should("eq", routes[label]);
    });
  });
});
