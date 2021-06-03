describe("Navigation", () => {
  it("Visits the home page", () => {
    cy.visit("/");

    cy.get('h1')
      .should('contain', 'Information when you need it')
    
    cy.contains('Get started')
    cy.contains('Contact us')
  });

  it("Visits the login page by clicking Login button", () => {
    cy.visit("/");

    cy.get("a")
      .contains("Login")
      .click()
    
    cy.url()
      .should('include', '/login')
    
    })
    
  it("Show a login error if there are empty fields", () => {
    cy.visit("/login");

    cy.get('.MuiButton-label')
      .click()

    cy.contains("Please provide a username and a password.")
  })

  it("Show a login error if the username or password are incorrect", () => {
    cy.visit("/login");

    cy.get('[data-testid=username]')
      .type('A Fake User')

    cy.get('[data-testid=password]')
      .type('A fake password')
    
    cy.get('.MuiButton-label')
      .click()

    cy.contains("Incorrect username or password.")
  })

  it("Logs the user in when provided correct credentials", () => {
    cy.visit("/login");

    cy.get('[data-testid=username]')
      .clear()
      .type('Alice')

    cy.get('[data-testid=password]')
      .clear()
      .type('alice')
    
    cy.get('.MuiButton-label')
      .click()

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
    
    cy.contains('Frankie')
    cy.contains('Kelsey').should('not.exist')

    cy.get('[aria-label="next page"]')
      .click()

    cy.contains('Frankie').should('not.exist')
    cy.contains('Kelsey')
  })

  it("Show an error message when creating a customer with empty fields", () => {
    cy.contains("Save")
      .click()
    
    cy.contains("Please fill out all required fields.")

    cy.get('#first')
      .type('Cypress')
    
    cy.get('#last')
      .type('Demo')

    cy.get('#profession')
      .type('Automated Robot')

    cy.contains("Save")
      .click()

    cy.contains("Please fill out all required fields.").should('not.exist')
  })

  it ("Logs a user out when clicking the logout button", () => {
    cy.get("a")
      .contains("Login")
      .should('not.exist')
    
    cy.contains("Logout")
      .click()

    cy.get("a")
      .contains("Login")
  })
});