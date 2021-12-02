/// <reference types="cypress" />
/* eslint-disable-next-line no-unused-vars */
import { enterTodo, resetData, removeTodo } from '../../support/utils'

describe('Stubbing window.track', () => {
  beforeEach(resetData)

  // by default the "window.track" is called by the app
  // on load, on new todo, and on removing todo
  // and just prints the message using console.log

  it('works on click', () => {
    // visit the page
    // stub "window.track"
    // enter new todo
    // confirm the stub "window.track" was called once
    // with expected argument
    // tip: use 'have.been.calledOnceWithExactly' assertion
    cy.visit('/')
    cy.window().then(w => {
      console.log(w.track)
      cy.stub(w, 'track').as('track')
    })
  
    enterTodo('Something')
    cy.get('@track').should('have.been.calledOnceWithExactly', 'todo.add', 'Something')
  })

  it('tracks item delete', () => {
    // visit the page
    // stub "window.track"
    // enter and remove new todo
    // assert the stub "window.track" was called
    // with expected arguments
    cy.visit('/')
    cy.window().then(w => {
      console.log(w.track)
      cy.stub(w, 'track').as('track')
    })

    enterTodo('Something')
    removeTodo('Something')
    cy.get('@track').should('have.been.calledWith', 'todo.remove', 'Something')

  })

  it('resets the count', () => {
    // add a couple of items
    // confirm the stub was called N times
    // reset the stub
    // by invoking ".reset()" method
    // trigger more events
    // confirm the new number
    cy.visit('/')
    cy.window().then(w => {
      console.log(w.track)
      cy.stub(w, 'track').as('track')
    })

    enterTodo('Something')
    enterTodo('Anything')

    cy.get('@track').should('be.calledTwice').invoke('reset')
    cy.get('@track').should('not.be.called')

    enterTodo('Nothing')

    cy.get('@track').should('be.calledOnce')

  })

  it('adds stub after reload', () => {
    // create a single stub with
    // const trackStub = cy.stub().as('track')
    // stub the window.track after cy.visit
    // and after reload
    // and then count the number of calls

    const trackStub = cy.stub().as('track')

    cy.visit('/').then(w => {
      cy.stub(w, 'track').callsFake(trackStub)
    })

    enterTodo('Something')
    cy.get('@track').should('be.calledOnce')

    cy.reload().then(w => {
      cy.stub(w, 'track').callsFake(trackStub)
    })

    enterTodo('Anything')
    cy.get('@track').should('be.calledTwice')

  })

  it('works on load', () => {
    // set up the stub when the window object exists
    // but before any code loads
    // see https://on.cypress.io/visit onBeforeLoad
    // use Object.defineProperty(win, 'track', {...}) to
    // get the "window.track = fn" assignment and call
    // the cy.stub wrapping the fn
    // after the visit command confirm the stub was called

    cy.visit('/', {
      onBeforeLoad(w) {
        let track 
        let trackStub

        Object.defineProperty(w, 'track', {
          get() {
            return trackStub
          },
          set(fn) {
            track = fn
            trackStub = cy.stub().callsFake(track).as('track')
          }
        })
      }
    })
    cy.get('@track').should('have.been.calledOnceWith', 'window.load')
  })

  it.only('works via cy.on event handler', () => {
    // need to return the same stub when using cy.visit
    // and cy.reload calls that create new "window" objects
    // tip: use the cy.on('window:before:load', ...) event listener
    // which is called during cy.visit and during cy.reload
    // during the test reload the page several times, then check
    // the right number of "window.track" calls was made
    // https://on.cypress.io/catalog-of-events
  })

  it('works via Cypress.on event handler', () => {
    // create a single stub in the test
    // return it to anyone trying to use window.track
    // from Cypress.on('window:before:load') callback
    // https://on.cypress.io/catalog-of-events
  })
})
