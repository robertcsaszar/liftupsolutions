/// <reference types="cypress" />
// application should be running at port 3000
// and the "localhost:3000" is set as "baseUrl" in "cypress.json"
beforeEach(() => {
  cy.request('POST', '/reset', {
    todos: []
  })
})
beforeEach(() => {
  cy.visit('/')
})
/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

it('adds items to store', () => {
  addItem('something')
  addItem('something else')
  // get application's window
  // then get app, $store, state, todos
  // it should have 2 items
  cy.window().its('app.$store.state.todos').should('have.length', 2)
})

it('creates an item with id 1', () => {
  cy.intercept('POST', '/todos').as('new-item')

  // TODO change Math.random to be deterministic

  // STEPS
  // get the application's "window" object using cy.window
  // then change its Math object and replace it
  // with your function that always returns "0.1"
  let count = 1
  cy.window().its('Math').then((Math) => {
    cy.stub(Math, 'random').callsFake(() => {
      return `0.${count++}`
    })
  })

  addItem('something')
  // confirm the item sent to the server has the right values
  cy.wait('@new-item').its('request.body').should('deep.equal', {
    id: '1',
    title: 'something',
    completed: false
  })
})

// stub function Math.random using cy.stub
it('creates an item with id using a stub', () => {
  // get the application's "window.Math" object using cy.window
  // replace Math.random with cy.stub and store the stub under an alias
  // create a todo using addItem("foo")
  // and then confirm that the stub was called once
  cy.window().its('Math').then(m => {
    console.log(m.random)
    cy.stub(m, 'random').as('randomMath')
  })

  addItem("foo")
  cy.get('@randomMath').should('be.calledOnce')

})

it('puts the todo items into the data store', () => {
  // application uses data store to store its items
  // you can get the data store using "window.app.$store.state.todos"
  // add a couple of items
  // get the data store
  // check its contents
  addItem('Text 1')
  addItem('Text 2')
  cy.window().its('app.$store.state.todos').should('deep.equal', [
    { title: 'Text 1', completed: false },
    { title: 'Text 2', completed: false }
  ])
})

it('handles todos with blank title', () => {
  // bypass the UI and call app's actions directly from the test
  // app.$store.dispatch('setNewTodo', <desired text>)
  // app.$store.dispatch('addTodo')
  // using https://on.cypress.io/invoke
  // and then
  // confirm the application is not breaking
  cy.window().its('app.$store').invoke('dispatch', 'setNewTodo', '  ')
  cy.window().its('app.$store').invoke('dispatch', 'addTodo')

  cy.get('li.todo').should('have.length', 1).first().should('not.have.class', 'completed').find('label').should('have.text', '  ')
})
