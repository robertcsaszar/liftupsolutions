// import todo page object from "todo-page-object.js"
import { todoPage } from './todo-page-object'

describe('TodoMVC with Page Object', () => {
  beforeEach(() => {
    // visit the page
    todoPage.visit()
  })

  it('creates 3 todos', () => {
    // create default todos
    // and check that there are 3 of them
    todoPage.createTodos()
    todoPage.todos().should('have.length', 3)
  })

  context('toggles items', () => {
    beforeEach(() => {
      // what should you do before each test?
      todoPage.createTodos()
    })

    it('completes second item', () => {
      // toggle 1 item
      // check class names for all 3 items
      todoPage.toggle(1)
      todoPage.todos(0).should('not.have.class', 'completed')
      todoPage.todos(1).should('have.class', 'completed')
      todoPage.todos(2).should('not.have.class', 'completed')
    })
  })
})
