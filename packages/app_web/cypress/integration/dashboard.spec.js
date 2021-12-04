context('Dashboard screen', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get("input[id='email']").type("dasun@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=submit]').click();
        cy.wait(8)
    })

    it('should visit an itinerary upon click', function () {
        cy.get("[data-cy=viewItinerary").first().click();
        cy.wait(10).contains('Members')
    });
});
