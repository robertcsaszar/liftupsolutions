/// <reference types="cypress" />
/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

describe('reset data using XHR call', () => {
  beforeEach(() => {
      cy.request('POST', '/reset', {
        todos: []
      })
    cy.visit('/')
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe('reset data using cy.writeFile', () => {
  beforeEach(() => {
    const emptyTodos = {
      todos: []
    }
    const str = JSON.stringify(emptyTodos, null, 2) + '\n'
    // file path is relative to the project's root folder
    // where cypress.json is located
    cy.writeFile('todomvc/data.json', str, 'utf8')
    cy.visit('/')
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe.only('reset data using a task', () => {
  beforeEach(() => {
    // TODO call a task to reset data
    cy.task('resetData')
    cy.visit('/')
    cy.get('li.todo').should('have.length', 0)
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe('set initial data', () => {
  it('sets data to complex object right away', () => {
    // TODO call task and pass an object with todos
    cy.visit('/')
    // check what is rendered
  })

  it('sets data using fixture', () => {
    // TODO load todos from "cypress/fixtures/two-items.json"
    // and then call the task to set todos
    cy.visit('/')
    // check what is rendered
  })
})
