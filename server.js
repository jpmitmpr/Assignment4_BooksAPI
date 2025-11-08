const express = require('express');
const app = express();
const books = require('./book-data'); // or './books-data' depending on your file name

app.use(express.json());

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST add book
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (req.body.title) book.title = req.body.title;
  if (req.body.author) book.author = req.body.author;
  res.json(book);
});

// DELETE remove book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted' });
});

// ✅ Export the app (for Jest/Supertest)
module.exports = app;

// ✅ Only start the server if running directly (not during tests)
if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
