context('Register screen', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should redirect the user to home page upon successful creation', function () {
        cy.get("input[id='firstName']").type("Angelo")
        cy.get("input[id='lastName']").type("Mathews")
        cy.get("input[id='email']").type("angelo@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=register]').click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(8).contains("Angelo")
    });

    it('should display an error if the user attempts to enter an existing email', function () {
        cy.get("input[id='firstName']").type("Dasun")
        cy.get("input[id='lastName']").type("Shanaka")
        cy.get("input[id='email']").type("dasun@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=register]').click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(8).contains("Create a new account")
    });
});
