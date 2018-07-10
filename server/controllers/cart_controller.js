const swag = require('../models/swag');

module.exports = {
  add: (req, res) => {
    let {id} = req.query;
    let item = req.session.user.cart.find(e => {
      return e.id == id;
    });

    if(!item) {
      item = swag.find(item => item.id == id);
      req.session.user.cart.push(item);
      req.session.user.total += item.price
    }

    res.status(200).send(req.session.user);
  },
  remove: (req, res) => {
    let {id} = req.query;
    let index = req.session.user.cart.findIndex(item => item.id == id);

    req.session.user.total -= req.session.user.cart[index].price;
    req.session.user.cart.splice(index, 1);

    res.status(200).send(req.session.user);
  },
  checkout: (req, res) => {
    req.session.user.cart = [];
    req.session.user.total = 0;

    res.status(200).send(req.session.user);
  }
}