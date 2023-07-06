const express = require('express');
const app = express();
const router = require('./routers/router');


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(router);
// app.use(express.static(__dirname + '/public'));



app.listen(port = 3000, () => {
  console.log(`listening to port ${port}`);
});