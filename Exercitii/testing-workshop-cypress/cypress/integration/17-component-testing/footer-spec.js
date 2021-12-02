/// <reference types="cypress" />
// uncomment these as needed
// import React from 'react'
// import Footer from './Footer'
// adds custom command "cy.mount"
import 'cypress-react-unit-test'
// import { filters } from './filters'

beforeEach(() => {
  cy.viewport(500, 300)
})
it('shows Footer', () => {
  // mount imported Footer component
  // make sure to pass "count={10}"
  // and "nowShowing={filters.ALL_TODOS}" props
  //
  // get "footer" and make assertions
  //  - it should be visible
  //  - it should have "show-all" link with class "selected"

  cy.mount(<Footer count={10} nowShowing={filters.ALL_TODOS} />)

  cy.get('footer').should('be.visible').find('[data-cy=show-all]').should('have.class', 'selected')
})

it('clears completed on click', () => {
  // mounts imported Footer component
  // with onClearCompleted being cy.stub()
  // finds "button class=clear-completed" and clicks
  // and then checks that our stub was called once
  cy.mount(
    <Footer
      count={10}
      completedCount={4}
      nowShowing={filters.ALL_TODOS}
      onClearCompleted={cy.stub().as('onClearCompleted')}
    />
  )

  cy.get('footer')
    .find('.clear-completed')
    .should('be.visible')
    .click()

  cy.get('@onClearCompleted').should('have.been.calledOnce')
})
