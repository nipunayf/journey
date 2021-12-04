context('My Itineraries screen', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get("input[id='email']").type("dasun@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=submit]').click();
        cy.wait(8)

        cy.get('[data-cy=avatar]').click();
    })

    it('should search for selected states', function () {

    });
});
