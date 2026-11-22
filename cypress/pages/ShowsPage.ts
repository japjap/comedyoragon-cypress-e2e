import { BasePage } from "./BasePage";

/**
 * GUESS: the route is /shows and each upcoming show is an <article>.
 * TODO: add data-testid="show-card" to each show.
 */
export class ShowsPage extends BasePage {
  readonly path = "/shows";

  shows() {
    return cy.get("main article");
  }
}

export const showsPage = new ShowsPage();
