const delay = 2200;

describe("Navigation", () => {
  it("Visits the home page", () => {
    cy.visit("/");

    cy.get('h1')
      .should('contain', 'Information when you need it')
    
    cy.contains('Get started')
    cy.contains('Contact us')
    cy.wait(delay)

  });

  it("Redirects to an unauthorized page if the user isn't logged in", () => {
    cy.visit("/dashboard")
    cy.wait(delay)

    cy.url()
      .should('include', 'unauthorized')
    cy.wait(delay)
  })

  it("Visits the login page by clicking Login button", () => {
    cy.get("a")
      .contains("Login")
      .click()
    
    cy.url()
      .should('include', '/login')
    cy.wait(delay)
    
    })
    
  it("Show a login error if there are empty fields", () => {
    cy.get('[data-testid=username]')
      .type('A Fake User')

    cy.get('.MuiButton-label')
      .click()
    cy.wait(delay)

    cy.contains("Please provide a username and a password.")
    cy.wait(delay)

  })

  it("Show a login error if the username or password are incorrect", () => {
    cy.get('[data-testid=password]')
      .type('A fake password')
    cy.wait(delay)
    
    cy.get('.MuiButton-label')
      .click()
    cy.wait(delay)

    cy.contains("Incorrect username or password.")
    cy.wait(delay)

  })

  it("Logs the user in when provided correct credentials", () => {
    cy.get('[data-testid=username]')
      .clear()
      .type('Alice')

    cy.get('[data-testid=password]')
      .clear()
      .type('alice')
    cy.wait(delay)

    cy.get('.MuiButton-label')
      .click()
    cy.wait(delay)

    cy.url()
      .should('include', '/dashboard')

    cy.get("a")
      .contains("Login")
      .should('not.exist')

    cy.get("a")
      .contains("Dashboard")
      .should('exist')
  })

  it("Dashboard should display a welcome message", () => {
    cy.contains('Welcome, Alice')
  })

  it("Dashboard should show all customers and 2 Download CSV Links", () => {
    cy.contains('All Customers')

    cy.contains('Export All Customers (CSV)')

    cy.contains('Export Customers Created By Me (CSV)')
  })

  it("Changing rows per page and navigating the page number display different data", () => {
    cy.contains('Frankie').should('not.exist')
    cy.contains('Kelsey').should('not.exist')

    cy.get('[aria-label="rows per page"]')
      .select('10')
    cy.wait(delay)
    
    cy.contains('Frankie')
    cy.contains('Kelsey').should('not.exist')

    cy.get('[aria-label="next page"]')
      .click()
    cy.wait(delay)

    cy.contains('Frankie').should('not.exist')
    cy.contains('Kelsey')
  })

  it("Show an error message when creating a customer with empty fields", () => {
    cy.get('#first')
      .type('Cypress')
    cy.wait(delay)
    
    cy.get('#last')
      .type('Demo')
    cy.wait(delay)

    cy.contains("Save")
      .click()
    cy.wait(delay)
    
    cy.contains("Please fill out all required fields.")
    cy.wait(delay)
  })

  it("Create a new customer", () => {
    cy.get('#profession')
      .type('Automated Robot')
    cy.wait(delay)

    cy.contains("Save")
      .click()
    cy.wait(delay)

    cy.contains("Please fill out all required fields.").should('not.exist')
    cy.wait(delay)
  })

  it ("Logs a user out when clicking the logout button", () => {
    cy.get("a")
      .contains("Login")
      .should('not.exist')
    cy.wait(delay)
    
    cy.contains("Logout")
      .click()
    cy.wait(delay)

    cy.get("a")
      .contains("Login")
  })
});