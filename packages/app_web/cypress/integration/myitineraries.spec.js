context('My Itineraries screen', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get("input[id='email']").type("dasun@gmail.com")
        cy.get("input[id='password']").type("asdasd")

        cy.get('[data-cy=submit]').click();
        cy.wait(8)

        cy.get('[data-cy=avatar]').click();
        cy.get('[data-cy=myItineraries]').click();
    })

    it('should search for selected states', function () {
        cy.get('[data-cy=state').select('To Be Reviewed')
        cy.get('[data-cy=search').click()

        cy.wait(3).contains('Hakgala Botanical Garden')
    });

    it('should search for specified keyword', function () {
        cy.get('[data-cy=state').select('To Be Reviewed')
        cy.get("input[id='keyword']").type("Hakgala")
        cy.get('[data-cy=search').click()

        cy.wait(3).contains('Hakgala Botanical Garden')
    });
});
