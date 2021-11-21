/// <reference types="cypress" />

describe('Our first suite', () => {

  it('First test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //by Tag Name
    cy.get('input')

    //by ID
    cy.get('#inputEmail1')

    //by Class Name
    cy.get('.input-full-width')

    //by Attribute Name
    cy.get('[placeholder]')

    //by Attribute Name and Value
    cy.get('[placeholder="Email"]')

    //by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag Name and Attribute with Value
    cy.get('input[placeholder="Email"]')

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    //by Tag Name, Attribute with Value, ID and Class Name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

    //The most recommended way by cypress
    cy.get('[data-cy="imputEmail1"]')

  })

  it('Second test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in')

    cy.contains('[status="warning"]','Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card','Horizontal form').find('[type="email"]')

  })

  it('Then and Wrap method', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Cypress Method

    // First Form
    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    // Second Form
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    // JQuerry Method

    // Create a function to indentify the first form
    cy.contains('nb-card', 'Using the Grid').then( firstForm => {

      // Store the results from the first Form in a const
      const emailFirstlabel = firstForm.find('[for="inputEmail1"]').text()
      const passwordFirstLabel = firstForm.find('[for="inputPassword2"]').text()

      // Confirm the text
      expect(emailFirstlabel).to.equal('Email')
      expect(passwordFirstLabel).to.equal('Password')

      // Create a to indentify the second form
      cy.contains('nb-card', 'Basic form').then( secondForm => {

        // Store the results from the second form in a const
        const emailSecondlabel = secondForm.find('[for="exampleInputEmail1"]').text()
        const passwordSecondLabel = secondForm.find('[for="exampleInputPassword1"]').text()

        // Confirm the text
        expect(emailSecondlabel).to.equal('Email address')
        expect(passwordSecondLabel).to.equal('Password')

        // Convert from JQuerry Method to Cypress Method
        cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

      })

    })

  })

  it('Identify and Type', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Indentify the Email field and type the email address
    cy.get('[data-cy="imputEmail1"]').type('test@test.com')

    // Identify the Password field and type the password
    cy.get('#inputPassword2').type('testing')

    // Identify the Sign In button and click it
    cy.get('[data-cy="imputEmail1"]')
      .parents('nb-card')
      .find('[data-cy="signInButton"]')
      .click()


  })

  it('Invoke comand', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Identify Basic form
    cy.contains('nb-card', 'Basic form').then( BasicForm => {
      const emailInput = BasicForm.find('[for="exampleInputEmail1"]').text()
      const passInput = BasicForm.find('[for="exampleInputPassword1"]').text()

      // Compare the text
      expect(emailInput).to.equal('Email address')
      expect(passInput).to.equal('Password')

    })

    // Type Email and Password
    cy.get('#exampleInputEmail1').type('testing@test.com')
    cy.get('#exampleInputPassword1').type('testing')

    // Identify "Check me out" and click it
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()

    // Check if the the "Check me out" is checked
    cy.contains('nb-card', 'Basic form')
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')

  })

  it("Assert Property", () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    // Identify the Common Datepicker, find the input and store it
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {

      // Click the stored input
      cy.wrap(input).click()

      // Get the Calendary Day Picker, choose a day and click it
      cy.get('nb-calendar-day-picker').contains('18').click()

      // Check if the choosed day is the right one in the input
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Nov 18, 2021')
    })

  })

  it('radio button', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
      
      // Click the first radio button and verify if is "checked"
      cy.wrap(radioButtons)
        .first()
        .check({force:true})
        .should('be.checked')

      // Click the second radio button
      cy.wrap(radioButtons)
        .eq(1)
        .check({force:true})
  
      // Verify if the first radio button is unchecked    
      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')
      
      // Verify if the 3rd radio button is disabled
      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')  
    })

  })

  it('check boxes', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // Identify the check boxes
    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({force:true})
    cy.get('[type="checkbox"]').eq(1).check({force:true})

  })

  it('Lists and Dropdowns', () => {

    cy.visit('/')

    // First Method

    // Identify the dropdown and click it
    cy.get('nav nb-select').click()

    // Pick an option from the dropdown and click it
    cy.get('.options-list').contains('Dark').click()

    // Check if the text is the same as the selected option
    cy.get('nav nb-select').should('contain', 'Dark')

    // Check if the color is corect
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // Second Method

    // Identify the dropdown and store it
    cy.get('nav nb-select').then( dropdown => {

      // Click the dropdown
      cy.wrap(dropdown).click()

      // Parse through each dropdown's options
      cy.get('.options-list nb-option').each( (listItem, index) => {

        // Store the text and remove the space
        const itemText = listItem.text().trim()

        // Create an object with all colors
        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        // Click the options 1 by 1
        cy.wrap(listItem).click()

        // Check if the text is the same as the selected option
        cy.wrap(dropdown).should('contain', itemText)

        // Check if the color is corect
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
        
        // Condition to stop clicking after the last option
        if (index < 3) {
          cy.wrap(dropdown).click()
        }

      })
    })


  })

  it('Web Tables', () => {

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1 - Edit current row
    cy.get('tbody').contains('tr', 'Larry').then( TableRow => {

      // Identify the edit button and click it
      cy.wrap(TableRow).find('.nb-edit').click()

      // Identify the age input and type '28'
      cy.wrap(TableRow).find('[placeholder="Age"]').clear().type('28')

      // Identify the confirm button and click it
      cy.wrap(TableRow).find('.nb-checkmark').click()

      // Check if the new age is correctly edited
      cy.wrap(TableRow).find('td').eq(6).should('contain', '28')
    })

    // 2 - Add a new Row

    // Click on Add Button
    cy.get('thead').find('.nb-plus').click()

    // Store the new row
    cy.get('thead').find('tr').eq(2).then( tableRow => {

      // Identify the first name input and type 'Robert'
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Robert')

      // Identify the last name input and type 'Csaszar'
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Csaszar')

      // Identify the confirm button and click it
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    // Store the added row and confirm if the data are corect
    cy.get('tbody tr').first().find('td').then( tableColumns => {

      // Identify the first name column and check the name
      cy.wrap(tableColumns).eq(2).should('contain', 'Robert')

      // Identify the last name column and check the name
      cy.wrap(tableColumns).eq(3).should('contain', 'Csaszar')
    })

  })

  it('Datepicker', () => {

    // Create a function to select any day in the future
    function selectDayFromCurrent(day){

      // Get current date
      let date = new Date()

      // Add days to the current date
      date.setDate(date.getDate() + day)

      let futureDay = date.getDate()

      // Get the current month converted in a short month (Jun, Feb etc)
      let futureMonth = date.toLocaleString('default', {month: 'short'})

      // Store the future day, month and year
      let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

      // Identify the element with the current date
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribue => {
        
        // Create a condition to check and change the month according to the future days
        // If the current month is not the same as the future month then click the arrow to change the month
        if(!dateAttribue.includes(futureMonth)){

          // Identify the arrow and click it
          cy.get('[data-name="chevron-right"]').click()

          // Run the function until the current month and the future month are the same
          selectDayFromCurrent(day)
        } else {

          // Current month and future month are the same
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }

      })

      // Return the future date as a string
      return dateAssert

    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    // Identify the Common Datepicker, find the input and store it
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {

      // Click the stored input
      cy.wrap(input).click()

      // Store the function
      let dateAssert = selectDayFromCurrent(10)

      // Check if the choosed day is the right one in the input
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })

  })

  it('Tooltip', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')

  })

  it.only('Dialog Box',() => {

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

  })

})
