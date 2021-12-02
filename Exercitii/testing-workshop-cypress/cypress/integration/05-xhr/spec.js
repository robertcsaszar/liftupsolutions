/// <reference types="cypress" />
//
// note, we are not resetting the server before each test
// and we want to confirm that IF the application has items already
// (for example add them manually using the browser localhost:3000)
// then these tests fail!
//
// see https://on.cypress.io/intercept

/* eslint-disable no-unused-vars */

it('starts with zero items (waits)', () => {
  cy.visit('/')
  // wait 1 second
  // then check the number of items
  cy.wait(1000)
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network proxy with cy.server()
  // spy on route `GET /todos`
  //  with cy.intercept(...).as(<alias name>)
  // THEN visit the page

  cy.intercept('GET', 'http://localhost:3000/todos').as('todos')

  cy.visit('/')
  // wait for `GET /todos` route
  //  using "@<alias name>" string
  // then check the DOM

  cy.wait('@todos').its('response.body').should('have.length', 0)
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (stubbed response)', () => {
  // start Cypress network server
  // stub `GET /todos` with []
  // save the stub as an alias
  cy.intercept('GET', '/todos', []).as('todos')

  // THEN visit the page
  cy.visit('/')

  // wait for the route alias
  // grab its response body
  // and make sure the body is an empty list
  cy.wait('@todos').its('response.body').should('have.length', 0)
})

it('starts with zero items (fixture)', () => {
  // start Cypress network server
  // stub `GET /todos` with fixture "empty-list"
  cy.intercept('GET', '/todos', { fixture: 'empty-list.json' }).as('todos')

  // visit the page
  cy.visit('/')

  cy.wait('@todos').its('response.body').should('have.length', 0)
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('loads several items from a fixture', () => {
  // stub route `GET /todos` with data from a fixture file "two-items.json"
  cy.intercept('GET', '/todos', {fixture: 'two-items.json'})
  // THEN visit the page
  cy.visit('/')
  // then check the DOM: some items should be marked completed
  // we can do this in a variety of ways
  
  cy.get('li.todo').should('have.length', 2)
  cy.get('li.todo').first().should('not.have.class', 'completed')
  cy.contains('.todo','second item from fixture').should('have.class', 'completed')
})

it('posts new item to the server', () => {
  // spy on "POST /todos", save as alias
  cy.intercept('POST', '/todos', {title: 'test api', completed: false}).as('todos')
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')

  // wait on XHR call using the alias, grab its request or response body
  // and make sure it contains
  // {title: 'test api', completed: false}
  // hint: use cy.wait(...).its(...).should('have.contain', ...)
  cy.get('@todos').then(todos => {
    console.log(todos)
  })
  cy.wait('@todos').its('request.body').should('have.contain', {title: 'test api', completed: false})
})

it('handles 404 when loading todos', () => {
  // when the app tries to load items
  // set it up to fail with 404 to GET /todos
  // after delay of 2 seconds
  cy.intercept('GET', '/todos', {body: '404 Not found', statusCode: 404, delayMs: 2000}).as('todos')
  cy.visit('/', {
    // spy on console.error because we expect app would
    // print the error message there
    onBeforeLoad: (win) => {
      // spy
      cy.spy(win.console, 'error').as('console-error')
    }
  })
  // observe external effect from the app - console.error(...)
  // cy.get('@console-error')
  //   .should(...)
  cy.get('@console-error').should('have.been.calledWithExactly', '404 Not found')
})

it('shows loading element', () => {
  // delay XHR to "/todos" by a few seconds
  // and respond with an empty list
  // shows Loading element
  // wait for the network call to complete
  // now the Loading element should go away
  cy.intercept('GET', '/todos', {body: [], delayMs: 2000}).as('todos')

  cy.visit('/')

  cy.get('.loading').should('be.visible')

  cy.wait('@todos')
  cy.get('.loading').should('not.be.visible')
})

it('handles todos with blank title', () => {
  // return a list of todos with one todo object
  // having blank spaces or null
  // confirm the todo item is shown correctly

  cy.intercept('GET', '/todos', [
    {
      id: 123, 
      title: ' ', 
      completed: false
    }
  ]).as('todos')

  cy.visit('/')

  cy.get('li.todo')
    .should('have.length', 1)
    .first()
    .should('not.have.class', 'completed')
    .find('label')
    .should('have.text', ' ')
})

it('waits for network to be idle for 1 second', () => {
  // intercept all requests
  // on every intercept set the timestamp
  // retry using should(cb) checking the time
  // that has passed since the network timestamp

  let timestamp
  cy.intercept('GET', '*', () => {
    timestamp = + new Date()
    console.log('Timestamp: '+ timestamp)
  })

  cy.visit('/')

  const checking = + new Date()
  console.log('Checking: '+ checking)

  cy.wrap('Network idle for 1 second').should(() => {
    const time = timestamp || checking
    const timeElapsed = + new Date() - time
    console.log('Time Elapsed: '+ timeElapsed)

    if(timeElapsed < 1000) {
      throw Error ('Network is busy')
    }
  })
  cy.get('.todo-list li', { timeout: 10 }).should('have.length', 2)
})
