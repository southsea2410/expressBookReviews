const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "user1", password: "pw1"}, {username: "user2", password: "pw2"}, {username: "user3", password: "pw3"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  for (let user of users) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!isValid(username)) {
    return res.status(401).json({message: "Invalid username"});
  }
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({message: "Invalid password"});
  }
  
  // Create a token
  const payload = { username };
  let userToken = jwt.sign(payload, 'helloworld', {
    expiresIn: Date.now() + 1800000
  })
  res.cookie("userToken", userToken, {expires: new Date(Date.now() + 1800000), secure: false, httpOnly: false});
  req.session.authenticated = true;
  req.session.username = username;
  return res.status(200).json({message: "Login successful"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body;
  if (!(isbn in books)) {
    return res.status(404).json({message: "Could not find book with ISBN " + isbn});
  }
  console.log(req.session);

  books[isbn].reviews.push({username: req.session.username, content: review.content});
  return res.status(200).json({message: "Review successfully added " + review.content});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  for (let i = 0; i < books[isbn].reviews.length; i++) {
    if (books[isbn].reviews[i].username === req.session.username) {
      books[isbn].reviews.splice(i, 1);
      return res.status(200).json({message: "Review successfully deleted"});
    }
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
