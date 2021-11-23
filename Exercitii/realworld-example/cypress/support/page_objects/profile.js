function confirmUpdate(image, username, bio, email){
    cy.intercept('PUT', '**/user').as('updateProfile')

    cy.wait('@updateProfile')
    cy.get('@updateProfile').then(xhr => {
        console.log(xhr)
        expect(xhr.request.body.user.image).to.equal(image)
        expect(xhr.request.body.user.username).to.equal(username)
        expect(xhr.request.body.user.bio).to.equal(bio)
        expect(xhr.request.body.user.email).to.equal(email)
    })
}

export class ProfilePage{

    changeSettings(image, username, bio, email){

        cy.contains('Settings').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[placeholder="URL of profile picture"]').clear().type(image)
            cy.wrap(form).find('[placeholder="Username"]').clear().type(username)
            cy.wrap(form).find('[placeholder="Short bio about you"]').clear().type(bio)
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).submit()

            confirmUpdate(image, username, bio, email)
        })
    }


}

export const onProfilePage = new ProfilePage()