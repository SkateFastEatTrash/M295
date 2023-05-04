// Defining Constants
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')

//Specifying Port
const port = 3300

//Secifiying App
const app = express()

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


// Bibliothek 1

// List of Books
var books = [
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "lent": false,
    "ISBN": 9780446310789
  },
  {
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "lent": false,
    "ISBN": 9780345391803
  },
  {
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "lent": false,
    "ISBN": 9780385504201
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "lent": true,
    "ISBN": 9780141439518
  },
  {
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "lent": true,
    "ISBN": 9780060883287
  }
];

// returns JSON containing every Book
function findAll() {
  return books;
};

// returns JSON containing every Book which is currently lent
function findLends(){
  const lends = books.filter((book) => book.lent == true)
  return lends;
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
    "lent": false,
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
function updated(isbn, title, author, lent) {
  books.forEach(book => {
      if(book.ISBN == isbn){
          book.title = `${title}`;
          book.author =  `${author}`;
          book.lent = lent;
          return(book.title  + '\n' + book.author + '\n' + book.ISBN + '\n' + book.lent + '\n');
      }
  });
}

function lendsBook(isbn, lent) {
  books.forEach(book => {
      if(book.ISBN == isbn){
          book.lent = lent;
          console.log(book.title  + '\n' + book.author + '\n' + book.ISBN + '\n' + book.lent + '\n');
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
  const lent = req.query.lent
  console.log(title, author)
  updated(isbn, title, author, lent);
  res.send(findAll());
  
});

// Removes a book and shows the deleted books ISBN using the remove() function
app.delete('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  remove(isbn);
  res.send(isbn + " has been deleted");
});

//--------------------------------------------------------------------------------------//

// Bibliothek 2
app.get('/lends', (req, res) => {
  res.send(findLends())
});

app.get('/lends/:isbn', (req, res) => {
  const isbn = (req.params.isbn);
  res.send(findByID(isbn))
});

app.put('/lends/:isbn', (req, res) => {
  const isbn = (req.params.isbn);
  const lent = req.query.lent
  lendsBook(isbn, lent);
  res.send(findLends());
});

//--------------------------------------------------------------------------------------//

// Coockies and Tokens

// npm install express-session

// Starting session
app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: true,
  cookie: {}
}))

app.get('/visited', function (request, response, _) {
  // request.session is the object that holds the information of this specific session
  request.session.views = (request.session.views || 0) + 1
  console.log(request.session)

  response.end(request.session.views + ' views')
})
