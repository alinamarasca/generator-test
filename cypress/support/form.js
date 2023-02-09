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
