import { BasePage } from "./BasePage";

export interface BookingDetails {
  // Contact details. The last run filled these before failing, so the
  // fields exist, but their exact labels are not confirmed yet.
  name: string;
  email: string;
  phone?: string;

  // "Your event" section (labels confirmed from a screenshot of /book).
  /** Matched case-insensitively against the option text, e.g. "corporate". */
  eventType: string;
  date: string; // YYYY-MM-DD, the value format of <input type="date">
  startTime: string; // HH:mm, 24-hour, the value format of <input type="time">
  endTime?: string;
  venueOrCity: string;
  venueAddress?: string;
  expectedGuests?: string;
  aboutEvent?: string;
}

/**
 * The booking form at /book.
 *
 * Fields are found by label across the whole page, not inside
 * `form.first()`, because the form is split into sections. The labels
 * carry " *" or " (optional)" after the text, so the regexes match the
 * start of the label only.
 * TODO: add data-testid="booking-form" and data-testid on each field.
 */
export class BookingPage extends BasePage {
  readonly path = "/book";

  readonly labels = {
    name: /^\s*(your |full )?name\b/i, // GUESS: confirm the label text
    email: /^\s*(your )?email\b/i, // GUESS: confirm the label text
    phone: /^\s*(your )?(phone|mobile)\b/i, // GUESS: confirm the label text
    eventType: /^\s*type of event\b/i,
    date: /^\s*date\b/i,
    startTime: /^\s*start time\b/i,
    endTime: /^\s*end time\b/i,
    venueOrCity: /^\s*venue or city\b/i,
    venueAddress: /^\s*venue address\b/i,
    expectedGuests: /^\s*expected guests\b/i,
    aboutEvent: /^\s*tell us about your event\b/i,
  };

  /**
   * Waits for the page to finish loading before the test types anything.
   * On a slow machine (like Jenkins) React can hydrate after Cypress has
   * started typing and wipe the values, which then blocks the submit.
   */
  visit() {
    super.visit();
    cy.document().its("readyState").should("eq", "complete");
    this.field(this.labels.eventType).should("be.visible").and("be.enabled");
  }

  form() {
    return cy.get("main form");
  }

  field(label: RegExp) {
    return cy.findByLabelText(label);
  }

  /** GUESS: the submit button text. */
  submitButton() {
    return cy.findByRole("button", { name: /book|send|submit|request/i });
  }

  /** Picks the first option whose text contains `text`, ignoring case. */
  selectEventType(text: string) {
    this.field(this.labels.eventType).then(($select) => {
      const option = $select
        .find("option")
        .toArray()
        .find((o) => o.textContent?.toLowerCase().includes(text.toLowerCase()));
      expect(option, `an event type option containing "${text}"`).to.exist;
      cy.wrap($select).select(option!.textContent!.trim());
    });
  }

  private typeInto(label: RegExp, value?: string) {
    if (value === undefined || value === "") return;
    // The value check fails right here if the browser rejects the input
    // (for example a date format) instead of later at submit time.
    this.field(label).clear().type(value).should("have.value", value);
  }

  /**
   * Fails with a readable list of invalid fields, so the screenshot from a
   * failed run shows why the browser refused to submit the form.
   */
  assertNoInvalidFields() {
    cy.get("main").should(($main) => {
      const invalid = $main
        .find("input, select, textarea")
        .toArray()
        .filter((el) => !(el as HTMLInputElement).checkValidity())
        .map((el) => {
          const input = el as HTMLInputElement;
          const label = input.labels?.[0]?.textContent?.trim() || input.name || input.id;
          return `${label}: "${input.value}" (${input.validationMessage})`;
        });
      expect(invalid, "invalid booking fields").to.deep.equal([]);
    });
  }

  fill(d: BookingDetails) {
    const l = this.labels;
    this.typeInto(l.name, d.name);
    this.typeInto(l.email, d.email);
    this.typeInto(l.phone, d.phone);
    this.selectEventType(d.eventType);
    this.typeInto(l.date, d.date);
    this.typeInto(l.startTime, d.startTime);
    this.typeInto(l.endTime, d.endTime);
    this.typeInto(l.venueOrCity, d.venueOrCity);
    this.typeInto(l.venueAddress, d.venueAddress);
    this.typeInto(l.expectedGuests, d.expectedGuests);
    this.typeInto(l.aboutEvent, d.aboutEvent);
  }

  submit() {
    this.submitButton().scrollIntoView().should("be.visible").and("be.enabled").click();
  }
}

export const bookingPage = new BookingPage();
