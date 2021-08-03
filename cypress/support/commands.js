//  Add a note
Cypress.Commands.add("addNote", (title, text, favorite, type) => {
  cy.get(".btn").click(); // get the "Add" button && click it
  cy.get("input[name='title']").type(title);
  cy.get("textarea[name=text]").type(text);
  if (favorite)
    cy.get("input[name='favorite']").click(); // add to favorite
  cy.get(`input#${type}`).click();
  cy.get("input[name='submit']").click();

  //   close the form
  cy.get("button#add").click(); // close the form
})

// check the number of notes in the DB
Cypress.Commands.add("notesNumber", (expected) => {
  cy.get(".notes-item").should("have.length.at.least", expected);
})

//  delete a note
Cypress.Commands.add("deleteNote", (index, n) => {

  cy.get(".remove").then(e => {
    e[index].click();
    n--;
  });
})

// change the fovorite of a note 
Cypress.Commands.add("changeFavorite", () => {
  cy.get(".notes-item").first().dblclick()
})


//  Search testing...
Cypress.Commands.add("search", (text, expected) => {
  cy.get("#search").type(text);
  cy.get(".notes-item").then(e => {
    expect(e.length).to.be.at.least(expected);
  })
})
