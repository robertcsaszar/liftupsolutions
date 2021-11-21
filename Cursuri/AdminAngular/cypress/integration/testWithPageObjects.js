import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPages } from "../support/page_objects/fromLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datePicker"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Page Objects', () => {

    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('Verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPages.submitInlineFormWithNameAndEmail('Robert', 'test@test.com')
        onFormLayoutsPages.submitBasicFormWithEmailAndPassword('test@test.com', 'test')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(10)
        onDatePickerPage.selectDatePickerWithRangeFromToday(10, 20)
        navigateTo.smartTablePage()
        onSmartTablePage.updateAgeByFirstName('Larry', 28)
        onSmartTablePage.addNewRecordWithFirstAndLastName('Robert', 'Csaszar')
        onSmartTablePage.deleteRowByIndex(3)

    })

})
