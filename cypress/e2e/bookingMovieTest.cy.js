/// <reference types="cypress"/>
const adminData = require("../fixtures/adminData");
const selector = require("../fixtures/selectors");

describe("Booking a movie", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit("/admin");
  });

  it("Booking a movie from the admin panel", () => {
    cy.login(adminData.validEmail, adminData.validPassword);
    cy.get(selector.sessionGrid).eq(5).then(($title) => {
      cy.visit("/client");
      cy.get(selector.dayOfWeek).click();
      cy.get(selector.movieSection).contains($title.text()).parent().parent().next().contains("12:00").click();
      cy.choosePlace(8, 1, 7);
      cy.get(selector.bookButton).click();
      cy.contains("Вы выбрали билеты:").should("be.visible");
     });
  });
});