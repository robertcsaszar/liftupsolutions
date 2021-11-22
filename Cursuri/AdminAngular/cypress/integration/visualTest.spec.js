

describe('Visual Test', () => {

    it('Should test snapshot', () => {

        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            cy.wrap(firstForm).toMatchImageSnapshot()
            cy.document().toMatchImageSnapshot()
        })

    })


})