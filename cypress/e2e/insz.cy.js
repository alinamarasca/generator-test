/// <reference types="cypress"/>

import { accordion, form } from "../fixtures/aliases";

describe("INSZ component", () => {
  context("is proper accordion", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(1).as("insz");
    });

    it("component is shown in the list", () => {
      cy.accordionPresent("insz");
    });

    it("component toggles content on click", () => {
      cy.toggleContent("insz");
    });

    it("accordion contents has form", () => {
      cy.get("@insz").get(form.dataForm);
    });
  });

  context("has form to get for necessary data to generate insz", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(1).get(form.dataForm).as("form");
    });

    it("form has date field", () => {
      cy.get("@form").get(form.dateInput);
    });

    it("form has amount field", () => {
      cy.get("@form").get(form.numberInput);
    });

    it("form has submit btn", () => {
      cy.get("@form").get(form.submitButton).contains("Generate");
    });
  });

  context("toggle info paragraph", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(1).contains("insz").as("insz");
      cy.get("@insz").first(accordion.headerButton).click();
      cy.get("@insz").get(form.dataForm).get(form.infoSection).as("info");
      cy.get("@info").get("#insz").as("toggleInfo");
    });

    it("toggles info paragraph", () => {
      cy.toggleDescription("info", "toggleInfo");
    });
  });

  context("shows generated data", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("insz");
      cy.get("@insz").first(accordion.headerButton).click();
      cy.get("@insz").get(accordion.body).first("form").as("form");
    });

    it("shows response only after submitting", () => {
      cy.showsResponse("form");
    });
  });

  context("shows notification", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("insz");
      cy.get("@insz").first(accordion.headerButton).click();
      cy.get("@insz").get(accordion.body).first("form").as("form");
    });

    it("shows notification when click on copy button", () => {
      cy.showsNotification("form");
    });
  });
});
