/// <reference types="cypress"/>

import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";

describe("bis", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openAccordion(commonObject.header.bis);
    cy.get(accordion.body)
      .eq(0)
      .within(() => {
        cy.get("app-form").as("form");
      });
  });

  it("form has 'gender' field", () => {
    cy.get("@form").within(() => {
      cy.get(form.firstInnerForm);
      cy.get("label").contains("isGenderKnown");
    });
  });

  it("gender field has radio options yes/no", () => {
    cy.get("@form").within(() => {
      cy.get(form.firstInnerForm).as("gender");
    });

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
    cy.get("@form").within(() => {
      cy.get(form.firstInnerForm).within(() => {
        // cy.checkYesNoRadio();
        cy.get(form.radioInput).eq(0).and("has.value", "true").as("a");
        cy.get(form.radioInput).eq(1).and("has.value", "false").as("b");
        cy.get("@a").check();
        cy.get("@a").should("be.checked");
        cy.get("@b").should("not.be.checked");
        cy.get("@b").check();
        cy.get("@b").should("be.checked");
        cy.get("@a").should("not.be.checked");
      });
    });
  });

  it("has birthdate field", () => {
    cy.get("@form").within(() => {
      cy.get(form.secondInnerForm);
      cy.get("label").contains("isBirthdateKnown");
    });
  });

  it("birthdate field has radio options yes/no", () => {
    cy.get("@form").within(() => {
      cy.get(form.secondInnerForm).as("bd");
    });

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

  it("'birthdate' radio selection selects one answer", () => {
    cy.get("@form").within(() => {
      cy.get(form.secondInnerForm).within(() => {
        cy.get(form.radioInput).eq(0).and("has.value", "true").as("a");
        cy.get(form.radioInput).eq(1).and("has.value", "false").as("b");
        cy.get("@a").check();
        cy.get("@a").should("be.checked");
        cy.get("@b").should("not.be.checked");
        cy.get("@b").check();
        cy.get("@b").should("be.checked");
        cy.get("@a").should("not.be.checked");
      });
    });
  });

  it("has date field", () => {
    cy.get("@form").within(() => {
      cy.get(form.inputInnerForm).eq(0);
      cy.get("label").contains("date");
    });
  });
  it.only("has amount field", () => {
    cy.get("@form").within(() => {
      cy.get(form.inputInnerForm).eq(1);
      cy.get("label").contains("amount");
    });
  });
});
