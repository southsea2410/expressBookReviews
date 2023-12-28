const axios = require('axios');

const url = 'http://localhost:5000/';

// Task 10: Get all books – Using async callback function – 2 Points
const getAllBooks = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Task 11: Search by ISBN – Using Promises – 2 Points
const searchByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${url}/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Task 12: Search by Author – 2 Points
const searchByAuthor = async (author) => {
  try {
    const response = await axios.get(`${url}/${author}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Task 13: Search by Title - 2 Points
const searchByTitle = async (author) => {
  try {
    const response = await axios.get(`${url}/${title}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
