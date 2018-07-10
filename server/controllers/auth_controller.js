const users = require('../models/users');
let id = 0;

module.exports = {
  login: (req, res) => {
    let {username, password} = req.body;
    let user = users.find(user => {
      return user.username === username && user.password === password;
    });

    if(user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(500);
    }
  },
  register: (req, res) => {
    let {username, password} = req.body;
    users.push({id, username, password});
    req.session.user.username = username;
    id += 1;
    console.log({id, username, password});

    res.status(200).send(req.session.user);
  },
  signout: (req, res) => {
    req.session.destroy();
    res.send(req.session);
  },
  getUser: (req, res) => {
    res.status(200).send(req.session.user);
  }
}