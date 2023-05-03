const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Express launched on port: ${port}`)
})

// returns hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// return current date and time
app.get('/time', (req, res) =>{
  res.send(new Date().toISOString())
})

// redirects to the ZLI homepage
app.get('/zli', (req, res) => {
  res.redirect('https://www.zli.ch/');
})

const names = ["Ethan", 
              "Olivia", 
              "Caleb", 
              "Sophia", 
              "Lucas", 
              "Ava", 
              "Jackson", 
              "Isabella", 
              "Mason", 
              "Emma", 
              "Logan", 
              "Mia", 
              "Noah", 
              "Charlotte", 
              "Elijah", 
              "Amelia", 
              "Liam", 
              "Harper", 
              "Benjamin", 
              "Abigail"];


// returns a random name from list
app.get('/names', (req, res) => {
  res.send(names[Math.floor(Math.random()*20) + 1]);
});

//return a HTML file
app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//return a Image file
app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/image.jpg');
});

// retsurns a 418 error and returns "I'm a teapot"
app.get('/teapot', (req, res) => {
  res.status(418).send("I'm a teapot");
});

// returns browser information
app.get('/user-agent', (req, res) => {
  res.send(req.headers['user-agent']);
});

// always returns a 403 error
app.get('/secret', (req, res) => {
  res.status(403).send("You don't have permission to access this resource");
});

// returns a XML file
app.get('/xml', (req, res) => {
  res.sendFile(__dirname + '/xml.xml');
});

// returns a JSON object containing the properties "firstname","lastname", "age", "city" and "eyeColor"
app.get('/me', (req, res) => {
  res.json({
    firstName: "Leo",
    lastName: "Hauser",
    age: 18,
    city: "Zurich",
    eyeColor: "Blue"
  });
});

// get now + timezone returns current date and time in the given timezone
app.get('/now', (req, res) => {
  const tz = req.query.tz || 'CET'; // default to CET if no timezone abbreviation is provided // lookup timezone based on abbreviation
  const date = new Date().toLocaleString('de-CH', {timeZone: tz });
  res.send(`The current time in ${tz} is: ${date}`);
});


