import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";

// FORM
Cypress.Commands.add("radioAnswer", labelText => {
  cy.get(form.radioInput);
  cy.get(form.label).contains(labelText);
});

// ACCORDION
Cypress.Commands.add("accordionPresent", alias => {
  cy.get(`@${alias}`).should("be.visible");
  cy.get(`@${alias}`).first(accordion.header).contains(alias);
});

// TOGGLE CONTENT
Cypress.Commands.add("toggleContent", alias => {
  cy.get(`@${alias}`).within(() => {
    cy.get(accordion.body).should("not.be.visible");
    cy.get(".accordion-header").click();
    cy.get(form.submitButton).should("be.enabled");
    cy.get(form.numberInput).eq(0).type(58);
    cy.get(".accordion-header").click();
    cy.get(accordion.body).should("not.be.visible");
  });
});

// RESPONSE
Cypress.Commands.add("showsResponse", alias => {
  cy.get(`@${alias}`).get(response.responseField).should("not.exist");
  cy.get(`@${alias}`).within(() => {
    cy.get(form.submitButton).click();
    cy.get(`@${alias}`).get(response.responseField);
    cy.get(response.responseField).get(response.copyResponseButton);
  });
});

// SHOWS NOTIFICATION
Cypress.Commands.add("showsNotification", alias => {
  cy.get(`@${alias}`).within(() => {
    cy.get(form.submitButton).click();
    cy.get(response.copyResponseButton);
  });

  cy.get(response.responseField).get(response.copyResponseButton).click();
  cy.get(commonObject.pageElements.notificationsContainer).should(
    "not.be.empty"
  );
});

// TOGGLE TEXT
Cypress.Commands.add("toggleDescription", (formAlias, togglerAlias) => {
  cy.get(form.initialText).should("be.visible");
  cy.get(`@${togglerAlias}`).should("be.visible");

  cy.get(`@${togglerAlias}`).contains("More info");
  cy.get(`@${togglerAlias}`).click();
  cy.get(`@${togglerAlias}`).contains("Less info");
  cy.get(`@${togglerAlias}`).should("not.contain", "More");
  cy.get(`@${togglerAlias}`).click();
  cy.get(`@${togglerAlias}`).should("not.contain", "Less");

  cy.get(`@${formAlias}`).get(form.openedCollapsedText).should("be.visible");
  cy.get(`@${togglerAlias}`).click();
});