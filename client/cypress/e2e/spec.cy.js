describe("testing routed pages seperatly", () => {
  it("it should visit all 3 pages", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.visit("/nearby-attractions");
    cy.wait(1000);
    cy.visit("/public-transport-card");
  });
});

describe("route test Home -> Nearby Attractions", () => {
  it("should go to nearby page from home page", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#navbar > div.left > a:nth-child(3)").click();
    cy.wait(1000);
    cy.url().should("include", "/nearby-attractions");
  });
});

describe("route test Home -> Transport Card", () => {
  it("should go to transport page from home page", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#navbar > div.right > a").click();
    cy.wait(1000);
    cy.url().should("include", "/public-transport-card");
  });
});
