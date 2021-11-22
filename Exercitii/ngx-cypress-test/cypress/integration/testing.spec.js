/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigation"
import { onFormLayoutsPages } from "../support/page_objects/formLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datePicker"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test App', () => {

    beforeEach('Access App', () => {
        cy.openHomePage()
    })

    it('Navigate through menu', () => {

        // Layouts
        navigateTo.stepper()
        navigateTo.accordion()

        // Forms
        navigateTo.form()
        navigateTo.datepicker()

        // Modal & Overlays
        navigateTo.dialog()
        navigateTo.window()
        navigateTo.popover()
        navigateTo.toaster()
        navigateTo.tooltip()

        // Extra Components
        navigateTo.calendar()

        // Tables & Data
        navigateTo.smartTable()
        navigateTo.treeGrid()

        // Auth
        navigateTo.login()
        navigateTo.back()
        navigateTo.register()
        navigateTo.back()
        navigateTo.requestPassword()
        navigateTo.back()
        navigateTo.resetPassword()

    })

    it('Test forms', () => {

        navigateTo.form()

        // Inline Form
        cy.contains('nb-card', 'Inline form').then( inlineForm => {
            const name = inlineForm.find('[placeholder="Jane Doe"]')
            const email = inlineForm.find('.form-inline [placeholder="Email"]')

            const inlineCheckbox = inlineForm.find('nb-checkbox')
            const inlineCheckboxChecked = inlineForm.find('.custom-checkbox')

            cy.wrap(name).type('Robert Csaszar')
            cy.wrap(email).type('test@test.com')
            cy.wrap(inlineCheckbox).click()
            cy.wrap(inlineCheckboxChecked).invoke('attr', 'class').should('contain', 'checked')

        })

        // Using the Grid
        cy.contains('nb-card', 'Using the Grid').then(gridForm => {
            const emailLabe2 = gridForm.find('[for="inputEmail1"]').text()
            const passwordLabel2 = gridForm.find('[for="inputPassword2"]').text()

            const emailField2 = gridForm.find('#inputEmail1')
            const passwordField2 = gridForm.find('#inputPassword2')

            expect(emailLabe2).to.equal('Email')
            expect(passwordLabel2).to.equal("Password")

            cy.wrap(emailField2).type('test@test.com')
            cy.wrap(passwordField2).type('testing')
        })

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {

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

        // Basic form
        cy.contains('nb-card', 'Basic form').then( basicForm => {
            const emailLabel3 = basicForm.find('[for="exampleInputEmail1"]').text()
            const passwordLabel3 = basicForm.find('[for="exampleInputPassword1"]').text()

            const emailField3 = basicForm.find('#exampleInputEmail1')
            const passwordField3 = basicForm.find('#exampleInputPassword1')

            const checked = basicForm.find('.custom-checkbox')

            expect(emailLabel3).to.equal('Email address')
            expect(passwordLabel3).to.equal('Password')

            cy.wrap(emailField3).type('test@test.com')
            cy.wrap(passwordField3).type('testing')
            cy.wrap(basicForm).find('[type="checkbox"]').check({force: true})
            cy.wrap(checked).invoke('attr', 'class').should('contain', 'checked')

        })

        // Form without labels
        cy.contains('nb-card', 'Form without labels').then( formWithoutLabels => {
            const recipients = formWithoutLabels.find('[placeholder="Recipients"]')
            const subject = formWithoutLabels.find('[placeholder="Subject"]')
            const message = formWithoutLabels.find('[placeholder="Message"]')

            cy.wrap(recipients).type('Robert Csaszar')
            cy.wrap(subject).type('Something Useless')
            cy.wrap(message).type('Nothing good here, move on!')

        })

        // Block form
        cy.contains('nb-card', 'Block form').then( blockForm => {
            const firstNameLabel = blockForm.find('[for="inputFirstName"]').text()
            const lastNameLabel = blockForm.find('[for="inputLastName"]').text()
            const emailLabel4 = blockForm.find('[for="inputEmail"]').text()
            const websiteLabel = blockForm.find('[for="inputWebsite"]').text()

            const firstNameField = blockForm.find('#inputFirstName')
            const lastNameField = blockForm.find('#inputLastName')
            const emailField4 = blockForm.find('#inputEmail')
            const websiteField= blockForm.find('#inputWebsite')

            expect(firstNameLabel).to.equal('First Name')
            expect(lastNameLabel).to.equal('Last Name')
            expect(emailLabel4).to.equal('Email')
            expect(websiteLabel).to.equal('Website')

            cy.wrap(firstNameField).type('Robert')
            cy.wrap(lastNameField).type('Csaszar')
            cy.wrap(emailField4).type('test@test.com')
            cy.wrap(websiteField).type('https://www.google.ro')

        })

        // Horizontal form
        cy.contains('nb-card', 'Horizontal form').then( horizontalForm => {
            const emailLabel5 = horizontalForm.find('[for="inputEmail3"]').text()
            const passwordLabel4 = horizontalForm.find('[for="inputPassword3"]').text()

            const emailField5 = horizontalForm.find('#inputEmail3')
            const passwordField4 = horizontalForm.find('#inputPassword3')

            const rememberMe = horizontalForm.find('nb-checkbox')
            const rememberMeChecked = horizontalForm.find('.custom-checkbox')

            expect(emailLabel5).to.equal('Email')
            expect(passwordLabel4).to.equal('Password')

            cy.wrap(emailField5).type('test@test.com')
            cy.wrap(passwordField4).type('Testing')
            cy.wrap(rememberMe).click()
            cy.wrap(rememberMeChecked).invoke('attr', 'class').should('contain', 'checked')

        })

    })

    it('Better way to test forms', () => {

        navigateTo.form()
        onFormLayoutsPages.submitInlineForm('Robert Csaszar', 'test@test.com')
        onFormLayoutsPages.submitGridForm('test@test.com', 'Testing')
        onFormLayoutsPages.submitBasicForm('test@test.com', 'Testing')
        onFormLayoutsPages.submitFormWithoutLabels('Robert Csaszar', 'Something Useless', 'Nothing good here, move on!')
        onFormLayoutsPages.submitBlockForm('Robert', 'Csaszar', 'test@test.com', 'https://www.google.ro')
        onFormLayoutsPages.submitHorizontalForm('test@test.com', 'Testing')
    })

    it('Test DatePicker', () => {

        navigateTo.datepicker()
        onDatePickerPage.selectCommonDatePickerDateFromToday(10)
        onDatePickerPage.selectDatePickerWithRangeFromToday(10, 20)
    })

    it('Test Smart Tables', () => {

        navigateTo.smartTable()

        onSmartTablePage.updateAgeByFirstName('Ann', '29')
        onSmartTablePage.addNewRecordWithFirstAndLastName('Robert', 'Csaszar')
        onSmartTablePage.deleteRowByIndex(4)
    })

})