// Defining Constants
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3300

// --------------------------------------------------------------------------------------//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Prints Portnumber and URL
app.listen(port, () => {
  console.log(
    `\nPort: ${port}\thttp://localhost:${port}\tEnjoy ;)`
  );
});

// List of Books
var books = [
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "ISBN": 9780446310789
  },
  {
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "ISBN": 9780345391803
  },
  {
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "ISBN": 9780385504201
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "ISBN": 9780141439518
  },
  {
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "ISBN": 9780060883287
  }
];

// returns JSON containing every Book
function findAll() {
  return books;
};

// returns the book which contains the given ISBN
function findByID(isbn) {
  const foundbook = books.filter((book) => book.ISBN == isbn)
  return foundbook;
};

// adds new book with the given Information
function addnew(isbn, title, author) {
  const book = {
    "title": title,
    "author": author,
    "ISBN": isbn
  };
  books.push(book);
};

// removes book which contains given ISBN
function remove(isbn) {
  books = books.filter((book) => book.ISBN != isbn)
};

// changes information of given Book identified using ISBN
// Also logs information about the updated book in the console
function updated(isbn, title, author) {
  books.forEach(book => {
      if(book.ISBN == isbn){
          book.title = `${title}`;
          book.author =  `${author}`;
          console.log(book.title  + '\n' + book.author + '\n' + book.ISBN + '\n');
      }
  });
}

// Shows a JSON list of all books using the findALL() function
app.get('/books', (req, res) => {
  res.send(findAll())
});

// Only shows the book which contains the given ISBN using the findByID() function
app.get('/books/:isbn', (req, res) => {
  const isbn = (req.params.isbn);
  res.send(findByID(isbn))
});

// Creates new book with the given information using the addnew() function
app.post('/books/:isbn', (req, res) => {
  const isbn = (req.params.isbn);
  const title = req.query.title;
  const author = req.query.author
  addnew(isbn, title, author)
  res.send(books);
})

// Takes a already existing book and updtes the information using the updated function
app.put('/books/:isbn', (req, res) => {
  const isbn = (req.params.isbn);
  const title = req.query.title;
  const author = req.query.author
  console.log(title, author)
  updated(isbn, title, author);
  res.send(findAll());
  
});

// Removes a book and shows the deleted books ISBN using the remove() function
app.delete('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  remove(isbn);
  res.send(isbn + " has been deleted");
});