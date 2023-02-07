/// <reference types="cypress"/>

import { accordion, form } from "../fixtures/aliases";

describe("KBO component", () => {
  context("is proper accordion", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(2).as("kbo");
    });

    it("component is shown in the list", () => {
      cy.accordionPresent("kbo");
    });

    it("component toggles content on click", () => {
      cy.toggleContent("kbo");
    });
  });

  context("has form to get for necessary data to generate kbo", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(2).as("kbo");
    });

    it("accordion contents has form", () => {
      cy.get("@kbo").get(accordion.body).find("form");
    });

    it("form has version field", () => {
      cy.get("@kbo")
        .get(form.dataForm)
        .get(form.numberInput)
        .parent()
        .as("versionField");
      cy.get("@kbo").get(form.dataForm).get(form.numberInput);
      cy.get("@versionField").find("label").contains("version");
    });

    it("form has amount field", () => {
      cy.get("@kbo")
        .get(form.dataForm)
        .get(form.numberInput)
        .parent()
        .as("amountField");
      cy.get("@kbo").get(form.dataForm).get(form.numberInput);
      cy.get("@amountField").find("label").contains("amount");
    });

    it("form has submit btn", () => {
      cy.get("@kbo").get(form.submitButton).contains("Generate");
    });
  });

  context("toggle info paragraph", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(2).contains("kbo").as("kbo");
      cy.get("@kbo").first(accordion.headerButton).click();
      cy.get("@kbo").get(form.dataForm).get(form.infoSection).as("info");
      cy.get("@info").get("#kbo").as("toggleInfo");
    });

    it("toggles info paragraph", () => {
      cy.toggleDescription("info", "toggleInfo");
    });
  });

  context("shows generated data", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("kbo");
      cy.get("@kbo").first(accordion.headerButton).click();
      cy.get("@kbo").get(accordion.body).first("form").as("kboForm");
    });

    it("shows response only after submitting", () => {
      cy.showsResponse("kboForm");
    });
  });

  context("shows notification", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("kbo");
      cy.get("@kbo").first(accordion.headerButton).click();
      cy.get("@kbo").get(accordion.body).first("form").as("form");
    });

    it("shows notification when click on copy button", () => {
      cy.showsNotification("form");
    });
  });
});
