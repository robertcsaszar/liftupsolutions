function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if( attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}


export class Navigation{

    // Layout
    stepper(){
        selectGroupMenuItem('Layout')
        cy.contains('Stepper').click()
    }

    accordion(){
        selectGroupMenuItem('Layout')
        cy.contains('Accordion').click()
    }

    // Forms
    form(){
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datepicker(){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    // Modal & Overlays
    dialog(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    window(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Window').click()
    }

    popover(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Popover').click()
    }

    toaster(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltip(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    // Extra Components
    calendar(){
        selectGroupMenuItem('Extra Components')
        cy.contains('Calendar').click()
    }

    // Tables & Data
    smartTable(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    treeGrid(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Tree Grid').click()
    }

    // Auth
    login(){
        selectGroupMenuItem('Auth')
        cy.contains('Login').click()
    }

    register(){
        selectGroupMenuItem('Auth')
        cy.contains('Register').click()
    }

    requestPassword(){
        selectGroupMenuItem('Auth')
        cy.contains('Request Password').click()
    }

    resetPassword(){
        selectGroupMenuItem('Auth')
        cy.contains('Reset Password').click()
    }

    back(){
        cy.get('[data-name="arrow-back"]').click()
    }

}

export const navigateTo = new Navigation()