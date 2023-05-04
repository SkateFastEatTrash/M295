// npm install express express-session

const express = require('express')
const session = require('express-session')
const app = express()

app.use(express.json())
app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: false,
  cookie: {}
}))

// Caution: this is only an example. NEVER store credentials in code!
const secretAdminCredentials = { email: "desk@library.example", password: "m295" }

app.post('/login', function (request, response) {
	const { email, password } = request.body

	// Check the credentials against store
	if (email?.toLowerCase() == secretAdminCredentials.email && password == secretAdminCredentials.password) {

		// Link email to session
		request.session.email = email

		return response.status(200).json({ email: request.session.email })
	}

  return response.status(401).json({ error: "Invalid credentials" })
})

app.get('/verify', function (request, response) {
	
	// Check if email is set in session
	if (request.session.email) {
		return response.status(200).json({ email: request.session.email })
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.delete('/logout', function (request, response) {

	// Check if email is set in session
	if (request.session.email) {

		// Reset link of session to email
		request.session.email = null

		return response.status(204).send()
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.listen(3000)