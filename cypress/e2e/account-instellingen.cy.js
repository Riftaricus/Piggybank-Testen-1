describe('Overboeken geld', () => {
    it('shows a success message', () => {
        cy.visit('http://localhost:3001')
        cy.get('.login__account').contains('Melvin').click()
        cy.contains('Instellingen').click()

        cy.get('input[name="accountName"]')
            .clear()
            .type('Test van Melvin')
            .should('have.value', 'Test van Melvin')
        cy.get('button[type="submit"]').click()


        cy.visit('http://localhost:3001')
        cy.contains('Instellingen').click()

        cy.get('input[name="accountName"]').should('have.value', 'Test van Melvin')
    })
})

describe('Overboeken geld', () => {
    it('shows a success message', () => {
        cy.visit('http://localhost:3001')
        cy.get('.login__account').contains('Melvin').click()
        cy.contains('Instellingen').click()

        cy.get('input[name="accountName"]')
            .clear()
            .should('have.value', '')
        cy.get('button[type="submit"]').click()


        cy.visit('http://localhost:3001')
        cy.contains('Instellingen').click()

        cy.get('input[name="accountName"]').should('not.have.value', '')
    })
})