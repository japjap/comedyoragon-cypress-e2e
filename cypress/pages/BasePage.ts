import { NavBar } from "./NavBar";

/**
 * Shared behaviour for every page object. Subclasses set `path` and add
 * their own selectors and small actions. Assertions stay in the specs.
 */
export abstract class BasePage {
  abstract readonly path: string;
  readonly nav = new NavBar();

  visit() {
    cy.visit(this.path);
  }

  /** The main page heading (first <h1>). */
  heading() {
    return cy.get("h1").first();
  }

  footer() {
    return cy.get("footer");
  }
}
