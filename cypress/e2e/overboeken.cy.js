describe('Overboeken geld', () => {
  it('shows a success message', () => {
    cy.visit('http://localhost:3001')
    cy.get('.login__account').contains('Melvin').click()
    cy.contains('Overboeken').click()

    cy.get('select[name="toaccount"]')
      .select('Sara Ravestein')
      .find(':selected').should('contain.text', 'Sara Ravestein')
    cy.get('#amount').type('99.99').should('have.value', '99.99')
    cy.get('textarea[name="description"]')
      .type('This is a test')
      .should('have.value', 'This is a test')
    cy.get('button[type="submit"]').click()

    // cy.get retries until the alert is rendered
    cy.get('div.alert')
      .should('be.visible')
      .and('contain.text', 'Het is gelukt om € 99.99 over te maken!')
  })
})

describe('Overboeken geld zonder genoeg geld te hebben', () => {
  it('shows an error when the balance is too low', () => {
    cy.visit('http://localhost:3001')
    cy.get('.login__account').contains('Melvin').click()
    cy.contains('Overboeken').click()

    cy.get('select[name="toaccount"]').select('Sara Ravestein')
    cy.get('#amount').type('999999') // more than Melvin has
    cy.get('textarea[name="description"]').type('This is a test')
    cy.get('button[type="submit"]').click()

    cy.get('div.alert')
      .should('not.contain.text', 'Het is gelukt')
  })
})

describe('Overboeken geld zonder iets in te vullen', () => {
  it('shows an error when required fields are empty', () => {
    cy.visit('http://localhost:3001')
    cy.get('.login__account').contains('Melvin').click()
    cy.contains('Overboeken').click()

    cy.get('button[type="submit"]').click()

    cy.contains('Het is gelukt').should('not.exist')
  })
})

describe('Overboeken geld zonder omschrijving', () => {
  it('shows no alert when the description is left empty', () => {
    cy.visit('http://localhost:3001')
    cy.get('.login__account').contains('Melvin').click()
    cy.contains('Overboeken').click()

    cy.get('select[name="toaccount"]')
      .select('Sara Ravestein')
      .find(':selected').should('contain.text', 'Sara Ravestein')
    cy.get('#amount').type('99.99').should('have.value', '99.99')
    cy.get('button[type="submit"]').click()

    cy.get('div.alert').should('not.exist')
  })
})

describe('Overboeken geld terwijl je minder dan 0 hebt', () => {
  it('shows no alert when the description is left empty', () => {
    cy.visit('http://localhost:3001')
    cy.get('.login__account').contains('Melvin').click()
    cy.contains('Overboeken').click()

    cy.get('select[name="toaccount"]')
      .select('Sara Ravestein')
      .find(':selected').should('contain.text', 'Sara Ravestein')
    cy.get('#amount').type('99.99').should('have.value', '99.99')
    cy.get('textarea[name="description"]').type('This is a test')
    cy.get('button[type="submit"]').click()

    cy.get('div.alert')
      .should('not.contain.text', 'Het is gelukt')
  })
})