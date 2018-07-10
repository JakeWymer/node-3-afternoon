const express = require('express');
const session = require('express-session');
const path = require('path');
const {json} = require('body-parser');
require('dotenv').config();
const {checkForSession} = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../build`));

app.use(json());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}));

app.use(checkForSession);

app.get('/api/swag', swagController.read);

app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);

app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.remove);

app.get('/api/search', searchController.search);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});