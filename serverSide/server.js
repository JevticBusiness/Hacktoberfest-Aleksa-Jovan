const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const body_parser = require('body-parser');
const path = require('path');

//? Routes Import
const postsRouter = require('./routing/posts');

//? App init
const app = express();

//? Middlewares
app.use(express.json());
app.use(body_parser.json());

//? Routing
app.use('/api/posts', postsRouter);

//? Static files serve
let dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))
const environment = process.env.NODE_ENV;

if (environment === 'production') {
  app.use(express.static(path.join(dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send(`API is running.... in ${environment} mode`)
  })
}


//? Port listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('There was an error');
    process.exit(1);
  }
  
  // Database connection
  require('./database/database');
});

