const request = require('supertest');
const app = require('../server');
const books = require('../book-data');

// make a copy of the original data to reset before each test
const originalBooksSnapshot = JSON.parse(JSON.stringify(books));

beforeEach(() => {
  // reset books array to its original state before each test
  books.length = 0;
  originalBooksSnapshot.forEach(b => books.push(b));
});

describe('Books API', () => {
  test('GET /api/books returns all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(originalBooksSnapshot.length);
  });

  test('GET /api/books/:id returns one book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /api/books/:id returns 404 if not found', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/books creates a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'New Book', author: 'Tester' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'New Book');
  });

  test('PUT /api/books/:id updates a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('DELETE /api/books/:id removes a book', async () => {
    const res = await request(app).delete('/api/books/2');
    expect(res.statusCode).toBe(200);
  });
});