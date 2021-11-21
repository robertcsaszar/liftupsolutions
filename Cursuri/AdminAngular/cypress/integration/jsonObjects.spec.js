/// <reference> types="cypress" />

describe('JSON objects', () => {
    
    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2" }

        const simpleArrayOfValues = [ "one", "two", "three" ]

        const arrayOfObjects = [ {"key": "value"}, {"key2": "value2"}, {"key3": "value3"} ]
        
        const typeOfData = { "string": "this is a string", "number": 10 }

        const mix = {
            "First Name": "Robert",
            "Second Name": "Csaszar",
            "Age": 29,
            "Students": [
                {
                    "firstName": "Ion",
                    "lastName": "Vasile"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[1].key2)
        console.log(mix.Students[0].firstName)

        const lastNameOfSecondStudent = mix.Students[1].lastName

        console.log(lastNameOfSecondStudent)

    })

})
