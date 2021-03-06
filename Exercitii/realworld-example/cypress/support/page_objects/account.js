function confirmRegister(email, username, password) {
    // cy.request('GET', Cypress.env('apiUrl') + '/api/profiles/' + username).its('body').then(body => {
    //     const userConf = body.profile.username

    //     expect(userConf).to.equal(username)
    // })

    // cy.request({
    //     method: 'POST',
    //     url: Cypress.env('apiUrl')+'/api/users',
    //     failOnStatusCode: false,
    //     user:
    //     {
    //         email: email,
    //         password: password,
    //         username: username
    //     },
    //     headers:
    //     {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(account => {
    //     console.log(account)
    //     const statusCode = account.status

    //     if (statusCode == 200) {
    //         cy.log('Register success!')
    //     } else {
    //         cy.log('Register failed!')
    //     }
    // })

    cy.intercept('POST', Cypress.env('apiUrl') + '/api/users').as('confirmation')

    cy.wait('@confirmation')
    cy.get('@confirmation').then(confirmation => {
        const statusCode = confirmation.response.statusCode
        const emailConfirm = confirmation.request.body.user.email
        const userConfirm = confirmation.request.body.user.username

        if (statusCode == 200 && emailConfirm == email && userConfirm == username) {
            cy.log('Register success!')

        } else {
            cy.log('Register failed!')

            cy.get('.error-messages').invoke('text').then(errorMessages => {
                expect(errorMessages).to.equal(errorMessages)

            })
        }

    })

}

function checkAccount(email) {
    // cy.request(
    // {
    //     method: 'POST',
    //     url: Cypress.env('apiUrl') + '/api/users/login',
    //     failOnStatusCode: false,
    //     user:
    //     {
    //         email: email,
    //         password: password
    //     },
    //     headers:
    //     {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(account => {
    //     const statusCode = account.status

    //     if (statusCode == 200) {
    //         cy.log('Authentification success!')
    //     } else {
    //         cy.get('.error-messages li').should('contain', 'email or password is invalid')
    //         cy.log('Authentification failed!')
    //     }
    // })

    cy.intercept('POST', Cypress.env('apiUrl') + '/api/users/login').as('confirmation')

    cy.wait('@confirmation')
    cy.get('@confirmation').then(confirmation => {
        const statusCode = confirmation.response.statusCode
        const emailConfirm = confirmation.request.body.user.email

        if (statusCode == 200 && emailConfirm == email) {
            cy.log('Register success!')

        } else {
            cy.log('Register failed!')

            cy.get('.error-messages').invoke('text').then(errorMessages => {
                expect(errorMessages).to.equal(errorMessages)

            })
        }

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
        // cy.contains(username).click()
        confirmRegister(email, username)
    }

    logIn(email, password) {
        cy.contains('Sign in').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).submit()
        })
        checkAccount(email)
    }

}

export const onAccountPage = new accountPage()