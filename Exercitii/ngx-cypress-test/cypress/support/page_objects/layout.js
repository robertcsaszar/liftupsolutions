function checkAccordionItems(index){
    cy.get('nb-accordion-item').then(accordionItem => {
        if(accordionItem[index].className == "expanded"){
            expect(accordionItem[index]).to.have.class('expanded')
        } else {
            expect(accordionItem[index]).to.have.class('collapsed')
        }
    })
}

export class AccordionPage{

    toggleAccordionOnButton(){
        cy.contains('nb-card', 'Toggle Accordion By Button').find('button').click()
        checkAccordionItems(0)
    }

}

export const onAccordionPage = new AccordionPage