<form id="myForm">

  <input type="text" name="name" placeholder="Name" required>

  <input type="email" name="email" placeholder="Email" required>

  <textarea name="message" placeholder="Message"></textarea>

  <input type="submit" value="Submit">

</form>


// index.js
const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/submit', (req, res) => {

  // Get the form data from the request body

  const name = req.body.name;

  const email = req.body.email;

  const message = req.body.message;

  // Use the fs module to create a new file and save the data

  fs.writeFileSync(`./${name}.txt`, `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

  res.send('Form data received and saved to file.');

});

app.listen(3000, () => {

  console.log('Server started on port 3000');

});
