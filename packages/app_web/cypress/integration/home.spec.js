context('Home screen', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display the home screen as the home page', function () {
        cy.contains('A Smart Travel Planner')
    });

    it('should redirect to sign in page upon click', function () {
        cy.get('[data-cy=signin]').click();

        cy.wait(5).contains("Sign in to your account")
    });

    it('should redirect to register page upon click', function () {
        cy.get('[data-cy=register]').click();

        cy.wait(5).contains("Create a new account")
    });
});
