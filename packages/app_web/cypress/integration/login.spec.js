context('Login screen', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should redirect the user for correct credentials', function () {
        cy.get("input[id='email']").type("dasun@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=submit]').click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(8).contains("Dasun")
    });

    it('should reject the login request for incorrect credentials', function () {
        cy.get("input[id='email']").type("akila@gmail.com")
        cy.get("input[id='password']").type("a")

        cy.get('[data-cy=submit]').click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5).contains("Sign in to your account")
    });

});
