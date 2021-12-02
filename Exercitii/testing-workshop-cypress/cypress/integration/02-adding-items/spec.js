/// <reference types="cypress" />
it('loads', () => {
  // application should be running at port 3000
  cy.visit('localhost:3000')
  cy.contains('h1', 'todos')
})

beforeEach(function visitSite() {
  cy.log('Visiting', Cypress.config('baseUrl'))
  cy.visit('/')
})

// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// remember to manually delete all items before running the test
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

const addItem = (text) => {
  cy.get('.new-todo').type(`text{enter}`)
}

it('adds two items', () => {
  // repeat twice
  //    get the input field
  //    type text and "enter"
  //    assert that the new Todo item
  //    has been added added to the list
  // cy.get(...).should('have.length', 2)

  cy.get('.todo-list li').then(list => {
    while(list.length < 2 || !list.length) {
      cy.get('[placeholder="What needs to be done?"]').type('Something{enter}')
      list.length++
    }
    console.log(list.length)
  })

  cy.get('.todo-list li').should('have.length', 2)

})

it('can mark an item as completed', () => {
  // adds a few items
  // marks the first item as completed
  // confirms the first item has the expected completed class
  // confirms the other items are still incomplete
  // cy.get('[placeholder="What needs to be done?"]').type('Something{enter}')

  cy.contains('li.todo', '123').find('.toggle').should('exist').check()
  cy.contains('li.todo', '123').should('have.class', 'completed')
  cy.contains('li.todo', 'asd3').should('have.class', 'completed')

})

it('can delete an item', () => {
  // adds a few items
  // deletes the first item
  // use force: true because we don't want to hover
  // confirm the deleted item is gone from the dom
  // confirm the other item still exists

  cy.contains('li.todo', 'asd3').should('exist').find('.destroy').click({force: true})
  cy.contains('li.todo', 'asd3').should('not.exist')
  cy.contains('li.todo', '123').should('exist')
})

it('can add many items', () => {
  const N = 5
  for (let k = 0; k < N; k += 1) {
    // add an item
    // probably want to have a reusable function to add an item!
    if(k <= 5){
      addItem('Exact')
    }
  }
  // check number of items
  cy.get('li.todo').should('have.length', N)

})

it('adds item with random text', () => {
  // use a helper function with Math.random()
  // or Cypress._.random() to generate unique text label
  // add such item
  // and make sure it is visible and does not have class "completed"

  const randomLabel = `Item ${Math.random().toString().slice(2, 14)}`

  addItem(randomLabel)
  cy.contains('li.todo', randomLabel)
    .should('be.visible')
    .and('not.have.class', 'completed')

})

it('starts with zero items', () => {
  // check if the list is empty initially
  //   find the selector for the individual TODO items
  //   in the list
  //   use cy.get(...) and it should have length of 0
  //   https://on.cypress.io/get

  cy.get('li.todo').should('have.length', 0)
})

it('does not allow adding blank todos', () => {
  // https://on.cypress.io/catalog-of-events#App-Events
  cy.on('uncaught:exception', (e) => {
    // check e.message to match expected error text
    // return false if you want to ignore the error
    return !e.message.includes('Cannot add a blank todo')
  })

  // try adding an item with just spaces
  addItem(' ')
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
