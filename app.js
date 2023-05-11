const express = require('express');
const app = express();

// serve static files from the public directory
app.use(express.static('public'));

// parse JSON data in the request body
app.use(express.json());

// initialize empty array to store books
let books = [];

// GET /books route - returns array of books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books route - adds a book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  
  // generate unique ID for the book
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  
  // add book to collection
  books.push({ id, title, author, publishedDate });
  
  // send response with new book object
  res.json({ id, title, author, publishedDate });
});

// DELETE /books/:id route - removes a book from the collection
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  
  // find index of book with specified ID
  const index = books.findIndex(book => book.id === id);
  
  if (index !== -1) {
    // remove book from collection
    books.splice(index, 1);
    res.json({ message: `Book with ID ${id} deleted.` });
  } else {
    res.json({ message: `Book with ID ${id} not found.` });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
