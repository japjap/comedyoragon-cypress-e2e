/**
 * The site header. It appears on every page, so it lives in one place and
 * every page object exposes it as `this.nav`.
 *
 * GUESS: assumes the links sit inside a <nav> element and use the visible
 * labels from the live site. Verify with `npx cypress open`.
 * TODO: add data-testid="site-nav" to the <nav> in the Next.js layout.
 */
export type NavLink = "Home" | "About" | "Comedians" | "Shows" | "Contact";

export const NAV_LINKS: NavLink[] = ["Home", "About", "Comedians", "Shows", "Contact"];

export class NavBar {
  root() {
    return cy.get("nav").first();
  }

  link(label: NavLink) {
    return this.root().findByRole("link", { name: label });
  }

  goTo(label: NavLink) {
    this.link(label).click();
  }

  /** GUESS: "Book Us" may be a <a> or a <button>; matching either. */
  bookUsButton() {
    return cy.contains("a, button", /^\s*Book Us\s*$/i);
  }

  /** GUESS: "Ask us" opens a chat widget. TODO: data-testid="ask-us-button". */
  askUsButton() {
    return cy.contains("a, button", /^\s*Ask us\s*$/i);
  }
}

export const navBar = new NavBar();
