/// <reference types="cypress" />
// Adds cy.findByRole, cy.findByLabelText, cy.findByText and friends.
import "@testing-library/cypress/add-commands";
import { bookingPage, type BookingDetails } from "../pages/BookingPage";

/**
 * Cross-cutting actions live here as custom commands.
 * Page-specific actions belong in the page objects under cypress/pages.
 */
Cypress.Commands.add("fillBookingForm", (details: BookingDetails) => {
  bookingPage.fill(details);
});

/**
 * Stubs every POST so a test never sends a real booking or email.
 * GUESS: the form posts to an API route or a Next.js server action on the
 * same origin. TODO: narrow this to the real endpoint once known.
 */
Cypress.Commands.add("stubFormSubmissions", () => {
  cy.intercept({ method: "POST", url: "**" }, (req) => {
    // Shows each stubbed POST in the command log and the run's screenshots.
    Cypress.log({ name: "formPost", message: `${req.method} ${req.url}` });
    req.reply({ statusCode: 200, body: { ok: true } });
  }).as("formPost");
});

declare global {
  namespace Cypress {
    interface Chainable {
      fillBookingForm(details: BookingDetails): Chainable<void>;
      stubFormSubmissions(): Chainable<void>;
    }
  }
}

export {};
