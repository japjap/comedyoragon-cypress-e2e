import { BasePage } from "./BasePage";

/**
 * The /contact page has no form. It shows a "Contact" heading and a
 * "Contact details" card with an email, a location and a Website link.
 * TODO: add data-testid="contact-details" to the card.
 */
export class ContactPage extends BasePage {
  readonly path = "/contact";

  pageHeading() {
    return cy.findByRole("heading", { level: 1, name: /^contact$/i });
  }

  detailsHeading() {
    return cy.findByRole("heading", { name: /^contact details$/i });
  }

  /** The nearest element around the heading that also holds the email link. */
  detailsCard() {
    return this.detailsHeading()
      .parents()
      .filter(':has(a[href^="mailto:"])')
      .first();
  }

  /** GUESS: the email is a mailto: link. */
  emailLink() {
    return this.detailsCard().find('a[href^="mailto:"]');
  }

  websiteLink() {
    return this.detailsCard().findByRole("link", { name: /website/i });
  }
}

export const contactPage = new ContactPage();
