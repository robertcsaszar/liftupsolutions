function confirmation(username) {
    cy.request('GET', Cypress.env('apiUrl') + '/api/profiles/' + username).its('body').then(body => {
        const userConf = body.profile.username

        expect(userConf).to.equal(username)
    })
}

export class accountPage {

    createNewAccount(username, email, password) {
        cy.contains('Sign up').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[placeholder="Username"]').type(username)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).submit()
        })
        cy.contains(username).click()
        confirmation(username)
    }

    logIn(email, password) {
        cy.contains('Sign in').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).submit()
        })
    }

}

export const onAccountPage = new accountPage()