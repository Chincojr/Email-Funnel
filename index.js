const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')


const EmailForm = require('./routes/EmailRoutes')

const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.use(EmailForm)

app.listen(3000, () => console.log('Server started...'));