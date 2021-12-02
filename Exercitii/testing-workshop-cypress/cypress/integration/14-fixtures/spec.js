/// <reference types="cypress" />

const { forEach } = require("lodash")

/* eslint-disable no-unused-vars */
it('sets list of todos on the server', () => {
  // load fixture "two-items.json" from the fixtures folder
  cy.fixture('two-items')
  // then use it to make POST request to the "/reset" endpoint
  // just like we did to reset the server state
    .then(list => {
      console.log(list)
      cy.request('POST', '/reset', { todos: list })
    })
  // bonus: check that the list has 2 items
})

context('closure variable', () => {
  // store loaded list in this closure variable
  let list

  beforeEach(() => {
    cy.fixture('two-items')
    // then store the loaded items in variable "list"
    .then((l) => {
      list = l
    })
  })

  it('has two items', () => {
    if (list) {
      expect(list).to.have.length(2)
    }
  })

  it('sets list from context', () => {
    // post items to the server
    expect(list).to.have.length(2)
    cy.request('POST', '/reset', { todos: list})
  })
})

context('this.list', () => {
  // it is important to use "function () {}"
  // as a callback to "beforeEach", so we have
  // "this" pointing at the test context
  beforeEach(function () {
    cy.fixture('two-items')
    // then assign value to "this.list"
      .then((list) => {
      // inner callback can be a function or an arrow expression
      this.list = list
    })
  })

  // again, it is important to use "function () {}" callback
  // to make sure "this" points at the test context
  it('sets list from context', function () {
    // POST the items to the server using "/reset"
    cy.request('POST', '/reset', {todos: this.list})
  })

  it('has valid list with 2 items', function () {
    // check that "this.list" has 2 items
    expect(this.list).to.have.length(2)
  })
})

context('@list', () => {
  // again, it is important to use "function () {}"
  // as a callback to "beforeEach" to set the right "this"
  beforeEach(function () {
    // use shortcut "as('list')" will save the value into "this.list"
    // cy.fixture(<filename>).as(<alias name>)
    cy.fixture('two-items').as('list')
  })

  // again, it is important to use "function () {}" callback
  // to make sure "this" points at the test context
  it('sets list from context', function () {
    // use "this.list" like before to send the list to the server
    cy.request('POST', '/reset', { todos: this.list})
  })
})

// show that immediately using "this.list" does not work
it('does not work', function () {
  // load fixture and set it as "list"
  // then try checking "this.list" immediately
  cy.fixture('two-items').as('list')
  cy.request('POST', '/reset', { todos: this.list })
})

it('works if we change the order', function () {
  cy.fixture('two-items')
    .as('list')
    .then(() => {
      // by now the fixture has been saved into "this.list"
      // check that "this.list" has 2 items
      // use it to post to the server
      expect(this.list).to.have.length(2)
      cy.request('POST', '/reset', { todos: this.list})
    })
})

it('reads items loaded from fixture', () => {
  cy.fixture('two-items').then((todos) => {
    // post items
    // read file 'todomvc/data.json',
    // should be equal to the loaded fixture
    // note: JSON is parsed automatically!
    console.log(todos)
    cy.request('POST', '/reset', { todos: todos})
    const json = cy.readFile('./todomvc/data.json').should( json => {
      console.log(json.todos)
      expect(json.todos).to.have.length(todos.length)
      expect(json.todos).to.deep.equal(todos)
    })
  })
})

it('saves todo', () => {
  // reset data on the server
  // visit the page
  // type new todo via GUI
  // read file - it should have the item you have entered
  // hint: to demonstrate retries,
  // write should(cb) assertion
  // and add a delay to the application
  cy.request('POST', '/reset', { todos: [] })
  cy.visit('/')
  cy.get('.new-todo').type('for test{enter}')
  cy.readFile('todomvc/data.json').should((data) => {
    expect(data.todos).to.have.length(1)
    expect(data.todos[0].title).to.equal('for test')
  })

})

context('app actions with fixtures', () => {
  beforeEach(() => {
    // load fixture two-items
    // visit the page, make sure it has been loaded
    cy.fixture('two-items').as('items')
    
    cy.get('@items').then(items => {
      cy.request('POST', '/reset', { todos: items})
    })
    cy.visit('/')
  })

  it('invokes app action to set data from fixture', function () {
    // grab window app.$store
    // and for each item from the fixture
    // dispatch action "addEntireTodo"
    cy.window().its('app.$store')
    // create items by dispatching actions
    .then(store => {
      this.items.forEach((item) =>
        store.dispatch('addEntireTodo', {
          title: item.title,
          completed: item.completed
        })
      )
    })
  })
})
