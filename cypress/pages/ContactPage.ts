import { BasePage } from "./BasePage";

/**
 * GUESS: the route is /contact and the form uses <label>s that match these
 * names. Testing Library's findByLabelText needs the label to be linked to
 * the input (htmlFor/id or wrapping), so verify each field.
 * TODO: add data-testid="contact-form" to the <form>.
 */
export class ContactPage extends BasePage {
  readonly path = "/contact";

  form() {
    return cy.get("main form").first();
  }

  nameInput() {
    return this.form().findByLabelText(/name/i);
  }

  emailInput() {
    return this.form().findByLabelText(/email/i);
  }

  messageInput() {
    return this.form().findByLabelText(/message/i);
  }

  submitButton() {
    return this.form().findByRole("button", { name: /send|submit/i });
  }
}

export const contactPage = new ContactPage();
