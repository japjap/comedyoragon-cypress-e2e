import { bookingPage, homePage, type BookingDetails } from "../../pages";

interface BookingFixture {
  valid: BookingDetails;
  invalidEmail: BookingDetails;
}

const isInvalid = ($el: JQuery<HTMLElement>) =>
  !($el[0] as HTMLInputElement | HTMLSelectElement).checkValidity();

describe("Booking flow", () => {
  beforeEach(() => {
    cy.stubFormSubmissions();
    cy.fixture<BookingFixture>("booking").as("booking");
  });

  it("opens the booking form from Book Us", () => {
    homePage.visit();
    homePage.nav.bookUsButton().click();
    cy.location("pathname").should("eq", bookingPage.path);
    bookingPage.field(bookingPage.labels.eventType).should("be.visible");
  });

  it("submits a valid booking", function () {
    const { valid } = this.booking as BookingFixture;
    bookingPage.visit();
    cy.fillBookingForm(valid);
    bookingPage.submit();
    cy.wait("@formPost");
    // TODO: assert the real success message once known, for example:
    // cy.findByText(/thanks|we'll be in touch/i).should("be.visible");
  });

  it("blocks an invalid email", function () {
    const { invalidEmail } = this.booking as BookingFixture;
    bookingPage.visit();
    cy.fillBookingForm(invalidEmail);
    bookingPage.submit();
    // Relies on native <input type="email"> validation.
    bookingPage.field(bookingPage.labels.email).then(($el) => {
      expect(isInvalid($el), "email is invalid").to.eq(true);
    });
  });

  it("requires the event details", () => {
    bookingPage.visit();
    bookingPage.submit();
    const { eventType, date, startTime, venueOrCity } = bookingPage.labels;
    [eventType, date, startTime, venueOrCity].forEach((label) => {
      bookingPage.field(label).then(($el) => {
        expect(isInvalid($el), `${label} is required`).to.eq(true);
      });
    });
  });
});
