const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (isValid(username)) {
    return res.status(400).json({message: "Username already exists"});
  }
  users.push({username: username, password: password});
  return res.status(200).json({message: "Registration successful"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (isbn in books) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message: "Could not find book with ISBN " + isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByAuthor = {};
  for (let isbn in books) {
    if (books[isbn].author === author) {
      booksByAuthor[isbn] = books[isbn];
    }
  }
  return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let booksByTitle = {};
  for (let isbn in books) {
    if (books[isbn].title === title) {
      booksByTitle[isbn] = books[isbn];
    }
  }
  return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Write your code here
  const isbn = req.params.isbn;
  if (isbn in books) {
    return res.status(200).json(books[isbn].reviews);
  }
});

module.exports.general = public_users;
