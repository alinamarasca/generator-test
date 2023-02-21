/// <reference types="cypress"/>

import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";

const testItems = ["bis", "insz", "kbo"];

describe("common features", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("components on the page", () => {
    it("test elements are first three in the list in this order", () => {
      cy.get(".accordion-header").each((item, index, list) => {
        cy.wrap(item)
          .should("contain.text", testItems[index])
          .should("be.visible");

        if (index === 2) return false;
      });
    });

    it("click on accordion header toggles accordion content", () => {
      cy.get(accordion.component).each((item, index) => {
        // i left it with alias to use existing command
        cy.wrap(item).as(`${item}`);
        cy.wrap(item).toggleContent(item);
        if (index === 2) return false;
      });
    });
  });

  context("accordion content ", () => {
    beforeEach(() => {
      cy.visit("/");
      testItems.forEach(item => {
        cy.openAccordion(commonObject.header[item]);
      });
    });

    it("contains form", () => {
      cy.get(accordion.component).each((item, index) => {
        console.log(item);
        cy.wrap(item).within(() => {
          cy.get(form.dataForm);
        });
        if (index === 2) return false;
      });
    }),
      it("form contains submit button", () => {
        cy.get(accordion.component).each((item, index) => {
          cy.wrap(item).as(`${item}`);
          cy.get(`@${item}`).within(() => {
            cy.get(form.submitButton).should("contain.text", "Generate");
          });
          if (index === 2) return false;
        });
      }),
      it("shows result after submitting", () => {
        cy.get(form.dataForm).each((item, index) => {
          cy.wrap(item).within(() => {
            cy.submitForm();
          });

          if (index === 2) return false;
        });
      });

    it("result has a copy button", () => {
      cy.get(form.dataForm).each((item, index) => {
        cy.wrap(item).within(() => {
          cy.submitForm();
          cy.get(response.copyResponseButton);
        });
        if (index === 2) return false;
      });
    }),
      it("shows notification on click on 'copy'", () => {
        cy.get(form.dataForm).each((item, index) => {
          cy.wrap(item).within(() => {
            cy.submitForm();
            cy.get(response.copyResponseButton).click();
          });

          cy.get(commonObject.pageElements.notificationsContainer).should(
            "not.be.empty"
          );
          if (index === 2) return false;
        });
      });
  });

  context("component description", () => {
    beforeEach(() => {
      cy.visit("/");
      testItems.forEach(item => {
        cy.openAccordion(commonObject.header[item]);
      });
      cy.get(`${".info:has('#insz, #kbo')"}`).as("testEls");
    });

    it("shows description and link to toggle description", () => {
      cy.get("p").first().should("not.be.empty");
      cy.get(form.toggleText).should("be.visible");
    });

    it("changes toggler text", () => {
      cy.get(`@testEls`).each((item, index) => {
        cy.wrap(item).within(() => {
          cy.infoTogglerText(form.toggleText);
        });
      });
    });

    it("toggles extra text paragraph", () => {
      cy.get(`@testEls`).each((item, index) => {
        cy.wrap(item).within(() => {
          cy.collapseText(form.openedCollapsedText, form.toggleText);
        });
      });
    });
  });
});
