import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";

// HELPERS
Cypress.Commands.add("openAccordion", commonObjectName => {
  cy.get(commonObjectName).click();
});

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
    // need to type big number to avoid using 'cy.wait'
    cy.get(form.numberInput).eq(0).type(58231457);
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

// RESPONSE
Cypress.Commands.add("submitForm", alias => {
  cy.get(form.response).should("not.exist");
  cy.get(form.submitButton).click();
  cy.get(form.response);
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

// RADIO
Cypress.Commands.add("checkYesNoRadio", () => {
  cy.get(form.radioInput).eq(0).and("has.value", "true").as("a");
  cy.get(form.radioInput).eq(1).and("has.value", "false").as("b");
  cy.get("@a").check();
  cy.get("@a").should("be.checked");
  cy.get("@b").should("not.be.checked");
  cy.get("@b").check();
  cy.get("@b").should("be.checked");
  cy.get("@a").should("not.be.checked");
});

// API
Cypress.Commands.add("countApiCalls", (alias, expectedAmount) => {
  cy.wait(2000);
  cy.get(`@${alias}.all`).then(interceptions => {
    expect(interceptions).to.have.length(expectedAmount);
  });
});

// CHANGE TEXT
Cypress.Commands.add("infoTogglerText", element => {
  cy.get(element).contains("More info");
  cy.get(element).click();
  cy.get(element).contains("Less info");
  cy.get(element).should("not.contain", "More");
  cy.get(element).click();
  cy.get(element).should("not.contain", "Less");
});

// TOGGLE EXTRA TEXT
Cypress.Commands.add("collapseText", (element, toggler) => {
  cy.get(element).should("not.exist");
  cy.get(toggler).click();
  cy.get(element).should("be.visible");
  cy.get(toggler).click();
  cy.get(element).should("not.exist");
});
