/// <reference types="cypress"/>

import { accordion, form, response } from "../fixtures/aliases";
import { commonObject } from "../page-objects/commonPage";
describe(
  "test API",
  {
    env: {
      api: "https://bug6wxr929.execute-api.eu-west-1.amazonaws.com/Prod/"
    }
  },
  () => {
    describe("BIS API", () => {
      beforeEach(() => {
        cy.visit("/");
        cy.get(".accordion").eq(0).as("bis");
      });

      it("on submit API is called", () => {
        cy.intercept(
          "GET",
          "**/bis?isGenderKnown=true&isBirthdateKnown=true"
        ).as("allKnown");

        cy.openAccordion(commonObject.header.bis);
        cy.get("@bis").get("[id$=bis-generate-button]").click();
        cy.wait("@allKnown").then(res => {
          let body = res.response.body.bis[0];
          cy.get(form.response).contains(body);

          let status = res.response.statusCode;
          expect(status).to.eq(200);
        });
        cy.openAccordion(commonObject.header.bis);
      });
    });

    describe("INSZ API", () => {
      beforeEach(() => {
        cy.visit("/");
        cy.get(".accordion").eq(1).as("insz");
      });

      it("on submit API is called", () => {
        cy.intercept("GET", "**/insz").as("allKnown");

        cy.openAccordion(commonObject.header.insz);
        cy.get("@insz").get("[id$=insz-generate-button]").click();
        cy.wait("@allKnown").then(res => {
          let body = res.response.body.inszs[0];
          cy.get(form.response).contains(body);

          let status = res.response.statusCode;
          expect(status).to.eq(200);
        });
        cy.openAccordion(commonObject.header.insz);
      });
    });
  }
);
