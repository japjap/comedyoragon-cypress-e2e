import { BasePage } from "./BasePage";

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  eventDate: string; // YYYY-MM-DD, the value format of <input type="date">
  eventType: string;
  message: string;
}

/**
 * The form behind the "Book Us" button.
 *
 * GUESSES (all to verify with `npx cypress open`):
 * - "Book Us" leads to a page at /book with a <form> (it may instead be a
 *   modal or the Contact page; if so, change `path` and `form()`).
 * - The field labels match the regexes below.
 * TODO: add data-testid="booking-form" and data-testid on each field.
 */
export class BookingPage extends BasePage {
  readonly path = "/book";

  form() {
    return cy.get("form").first();
  }

  field(label: RegExp) {
    return this.form().findByLabelText(label);
  }

  submitButton() {
    return this.form().findByRole("button", { name: /book|send|submit/i });
  }

  fill(details: BookingDetails) {
    this.field(/name/i).clear().type(details.name);
    this.field(/email/i).clear().type(details.email);
    this.field(/phone/i).clear().type(details.phone);
    this.field(/date/i).clear().type(details.eventDate);
    this.field(/event type|occasion/i).then(($el) => {
      // Works for either a <select> or a text input.
      if ($el.is("select")) cy.wrap($el).select(details.eventType);
      else cy.wrap($el).clear().type(details.eventType);
    });
    this.field(/message|details/i).clear().type(details.message);
  }

  submit() {
    this.submitButton().click();
  }
}

export const bookingPage = new BookingPage();
