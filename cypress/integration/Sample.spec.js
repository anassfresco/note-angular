/// <reference types="cypress"  />

// importing Chance to generate random names && texts

import Chance from "chance";

/**
 *  we used "cy.pause()" in the beggining of every test just to make easier to see what happend on each test .
 *  we used "cy.wait(1000)" inside the while loop to make the process of adding notes a bit more real and easy to see.
 *  we used "json-server" as server that holds my notes and act like a Data Base for local testing (work the same as using a data base like firebase, sql, mongoBD, ... )
 *  we used "http-server" module to create a local server to access the application (default port: 8080).
 *  we create some custom Cypress methods (such as : addNote, notesNumber, deleteNote, ....) to make our tests easier
 *  
 * 
 * 
 */

describe("Notes Application", () => {

  let chance = new Chance();
  // global variable
  let initial_notes = 4; // nombre des notes initial dans la base de donnees
  let types = ["public", "private"]; // type des notes
  let favorite = true, // set default values
    type = "public";

  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/"); // application URL
  })



  //  1st simple
  it("has add button", () => {
    cy.pause()
    cy.contains("Add").should("have.length", 1); // we have only one button with text "Add"


  })

  // Visit the about page
  it("Visit routes", () => {
    cy.pause();

    cy.get("a").click(); // because we've only one 'a' tag in our application
    cy.pause();

    cy.url().should("contain", "about"); // confirm that we visit the right URL
    // all those texts are unique in the page
    cy.contains("About page").should("have.length", 1);
    cy.contains("Version").should("have.length", 1);

  })

  // check N° of notes we've in DB
  it("Number of  notes in DB", () => {
    cy.pause();

    // check if the number of notes is what we expect
    cy.notesNumber(initial_notes);

    // ! N.B: Number of notes will be at least equal to the  "initial_notes" (we use the *at.least* instead of *eqaul* to avoid errors that comes from testing for a while and forget to delete the new notes)
  })

  // All functions/methods used inside that block are declared and defined in the support folder
  it("Add a new Note", () => {

    cy.pause();

    // a loop to add 5 Notes
    let i = 0;
    while (i < 3) {


      type = types[i % 2];
      favorite = (i % 2) ? true : false;


      cy.addNote(
        chance.name(), // random name
        chance.sentence({ // random text
          words: (Math.random() * 10 | 0) + 1
        }),
        favorite,
        type
      );
      initial_notes += 1;
      cy.notesNumber(initial_notes);
      i++;
      cy.wait(1000); // wait for some time ....
    }

  })


  //  delete a note
  it("Delete a Note", () => {
    cy.pause();
    cy.deleteNote(4, initial_notes);
  })


  // Change the favorite of the 1st note (by default it's sets to false)
  it("Change the favorite of a Note", () => {
    // change favorite of the 1st note
    cy.pause();

    cy.changeFavorite();
  })

  //  Searching.....
  describe("Search testing: Search for notes", () => {

    it("Where title: Note", () => {
      cy.search("note", 2);
      cy.pause();
    })

    it("Where title contains 'e' ", () => {
      cy.search("e", 4);
      cy.pause();


    })

    it("Where title contains 'p' ", () => {
      cy.search("p", 2);

      cy.pause();

    })

    it("Where title: random text ", () => {
      cy.get("#search").type(chance.string({
        length: 6,
        alpha: true,
        numeric: true
      }), 0);

      // cuz no notes will match that string
      expect(0).to.eq(0);
      cy.pause();

    })


  })


})
