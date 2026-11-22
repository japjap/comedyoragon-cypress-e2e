import { BasePage } from "./BasePage";

/**
 * GUESS: the route is /comedians and each comedian is rendered as an
 * <article> (or a link card) with the name as a heading.
 * TODO: add data-testid="comedian-card" to each card and switch `cards()`
 * to `cy.get("[data-testid=comedian-card]")`.
 */
export class ComediansPage extends BasePage {
  readonly path = "/comedians";

  cards() {
    return cy.get("main article");
  }

  card(name: string) {
    return this.cards().filter(`:contains("${name}")`).first();
  }

  openComedian(name: string) {
    this.card(name).find("a").first().click();
  }
}

export const comediansPage = new ComediansPage();
