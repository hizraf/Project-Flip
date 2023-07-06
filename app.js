const express = require('express');
const app = express();
const router = require('./routers/router');
const session = require('express-session');
const fileUpload = require('express-fileupload');


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'hacktiv',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(fileUpload());
app.use(express.static('public'));
app.use(router);



app.listen(port = 3000, () => {
  console.log(`listening to port ${port}`);
});