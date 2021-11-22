
function checkLabels(formName, label, text){
    cy.contains('nb-card', formName).then( form => {
        const labelCheck = form.find('[for="'+label+'"]').text()
        expect(labelCheck).to.equal(text)
    })
}

export class FormLayoutsPage{

    submitInlineForm(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

    submitGridForm(email, password){
        cy.contains('nb-card', 'Using the Grid').find('form').then( form => {
            checkLabels('Using the Grid', 'inputEmail1', 'Email')
            checkLabels('Using the Grid', 'inputPassword2', 'Password')
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="radio"]').then(radioButtons => {

                cy.wrap(radioButtons)
                    .first()
                    .check({ force: true })
                    .should('be.checked')
    
                cy.wrap(radioButtons)
                    .eq(1)
                    .check({ force: true })
    
                cy.wrap(radioButtons)
                    .first()
                    .should('not.be.checked')
    
    
                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
            })
            cy.wrap(form).submit()
        })
    }

    submitBasicForm(email, password){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            checkLabels('Basic form', 'exampleInputEmail1', 'Email address')
            checkLabels('Basic form', 'exampleInputPassword1', 'Password')
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

    submitFormWithoutLabels(recipients, subject, message){
        cy.contains('nb-card', 'Form without labels').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Recipients"]').type(recipients)
            cy.wrap(form).find('[placeholder="Subject"]').type(subject)
            cy.wrap(form).find('[placeholder="Message"]').type(message)
            cy.wrap(form).submit()
        })
    }

    submitBlockForm(firstName, lastName, email, website){
        cy.contains('nb-card', 'Block form').then( form => {
            checkLabels('Block form', 'inputFirstName', 'First Name')
            checkLabels('Block form', 'inputLastName', 'Last Name')
            checkLabels('Block form', 'inputEmail', 'Email')
            checkLabels('Block form', 'inputWebsite', 'Website')
            cy.wrap(form).find('#inputFirstName').type(firstName)
            cy.wrap(form).find('#inputLastName').type(lastName)
            cy.wrap(form).find('#inputEmail').type(email)
            cy.wrap(form).find('#inputWebsite').type(website)
            cy.wrap(form).find('[type="submit"]').click()
        })
    }

    submitHorizontalForm(email, password){
        cy.contains('nb-card', 'Horizontal form').find('form').then( form => {
            checkLabels('Horizontal form', 'inputEmail3', 'Email')
            checkLabels('Horizontal form', 'inputPassword3', 'Password')
            cy.wrap(form).find('#inputEmail3').type(email)
            cy.wrap(form).find('#inputPassword3').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

}

export const onFormLayoutsPages = new FormLayoutsPage()