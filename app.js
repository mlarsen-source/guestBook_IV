/*

Author: Matthew Larsen
Date: 03/01/2025
Portfolio Project: Guestbook Part IV
Filename: app.js
File Description: JavaScript for Guestbook app

*/


// import libraries
import express from 'express';
import mariadb from 'mariadb';
import { validateForm } from './services/validation.js';
import dotenv from 'dotenv';

dotenv.config();

// define our database credentials
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// define function to connect to the DB
async function connect() {
  try {
      const conn = await pool.getConnection();
      console.log('Connected to the database!')
      return conn;
  } catch (err) {
      console.log(`Error connecting to the database ${err}`)
  }
}

// instantiate an express application
const app = express();

// instantiate an array to store form submissions
const contactList = [];

// handling form submission for data sent in the URL-encoded format
app.use(express.urlencoded({extended: true}));

//Set the view engine
app.set('view engine', 'ejs');

// serve static files from the 'public' directory
app.use(express.static('public'));

//define a port number for our server to listen on
const PORT = process.env.APP_PORT || 3000;


// define default route for contact form home page
app.get('/',(req, res)=>{
  
  // send home page as a response to the client
  res.render('home');
});


// define an admin route to view all contacts stored in database
app.get('/admin', async (req, res) => {

  //Connect to the database
  const conn = await connect();

  //Query the database
  const contacts = await conn.query('SELECT * FROM contacts')

  console.log(contacts);

  res.render('admin', { contacts });
});


// define a confirm route to handle contact form submission
app.post('/confirm',  async (req, res) =>
{
  
  // create contact object with form data from request body
  const contact = 
  {
    fname: req.body.fname,
    lname: req.body.lname,
    title: req.body.title,
    company: req.body.company,
    linkedIn: req.body.linkedIn,
    email: req.body.email,
    meet: req.body.meet,
    other: req.body.other,
    message: req.body.message,
    mailList: req.body.mailList || "No",
    format: req.body.format,
  };

  // validate form fields
  const result = validateForm(contact);
  if (!result.isValid) {
    console.log(result.errors);
    res.send(result.errors);
    return;
  }

  // connect to the database
  const conn = await connect();

  // add the contact to our database
  const insertQuery = await conn.query(`INSERT INTO contacts (fname, lname, title, company, linkedIn, email, meet, other, message, mailList, format)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[contact.fname, contact.lname, contact.title, contact.company, contact.linkedIn, contact.email, contact.meet, contact.other, contact.message, contact.mailList, contact.format]);
      
  // send confirmation page to user
  res.render('confirm', { contact });
  
});


// tell the server to listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});