/// <reference types="cypress"/>

import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";

describe("BIS component", () => {
  context("is proper accordion", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("bis");
    });

    it("component is shown in the list", () => {
      cy.accordionPresent("bis");
    });

    it("component toggles content on click", () => {
      cy.toggleContent("bis");
    });
  });

  context("has form to get for necessary data to generate bis", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("bis");
    });

    it("accordion contents has form", () => {
      cy.get("@bis").get(form.dataForm);
    });

    it("form has 'gender' field", () => {
      cy.get("@bis").get(form.dataForm).get("form").eq(0).as("gender");

      cy.get("@gender").contains("isGenderKnown");

      cy.get("@gender")
        .get(form.radioAnswer)
        .eq(0)
        .within(() => {
          cy.radioAnswer("Yes");
        });

      cy.get("@gender")
        .get(form.radioAnswer)
        .eq(1)
        .within(() => {
          cy.radioAnswer("No");
        });
    });

    it("'gender' radio selection selects one answer", () => {
      cy.openAccordion(commonObject.testElements.bis);
      cy.get("@bis")
        .get(form.dataForm)
        .get("form")
        .eq(0)
        .as("gender")
        .within(() => {
          cy.checkYesNoRadio();
        });
    });

    it("form has 'birthdate' field", () => {
      cy.get("@bis").get(accordion.body).get("form").eq(1).as("bd");
      cy.get("@bd").contains("isBirthdateKnown");
      cy.get("@bd")
        .get(form.radioAnswer)
        .eq(0)
        .within(() => {
          cy.radioAnswer("Yes");
        });
      cy.get("@bd")
        .get(form.radioAnswer)
        .eq(1)
        .within(() => {
          cy.radioAnswer("No");
        });
    });

    it("'birthday' radio selection selects one answer", () => {
      cy.openAccordion(commonObject.testElements.bis);
      cy.wait(500);
      cy.get("@bis")
        .get(form.dataForm)
        .get("form")
        .eq(0)
        .within(() => {
          cy.checkYesNoRadio();
        });
    });

    it("form has 'date' field", () => {
      cy.get("@bis")
        .get(form.dataForm)
        .get(form.numberInput)
        .parent()
        .as("amountField");
      cy.get("@bis").get(form.dataForm).get(form.dateInput);
      cy.get("@amountField").find("label").contains("amount");
    });

    it("form has 'amount' field", () => {
      cy.get("@bis")
        .get(form.dataForm)
        .get(form.numberInput)
        .parent()
        .as("amountField");
      cy.get("@bis").get(form.dataForm).get(form.numberInput);
      cy.get("@amountField").find("label").contains("amount");
    });

    it("form has submit btn", () => {
      cy.get("@bis").get("[id$=bis-generate-button]").contains("Generate");
    });
    // it("submit btn makes API call", () => {});

    it("submit btn makes API call", () => {
      cy.openAccordion(commonObject.testElements.bis);
      cy.get("@bis").get("[id$=bis-generate-button]").click();
      // HOW DO I CHECK THAT API CALL WAS MADE WITHOUT SPECIFICS?
    });
  });

  context("shows generated data", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("bis");
      cy.get("@bis").first(accordion.headerButton).click();
      cy.get("@bis").get(accordion.body).first("form").as("form");
    });

    it("shows response only after submitting", () => {
      cy.showsResponse("form");
    });
  });

  context("shows notification", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".accordion").eq(0).as("bis");
      cy.get("@bis").first(accordion.headerButton).click();
      cy.get("@bis").get(accordion.body).first("form").as("form");
    });

    it("shows notification when click on copy button", () => {
      cy.showsNotification("form");
    });
  });
});
