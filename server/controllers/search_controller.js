const swag = require('../models/swag');

module.exports = {
  search: (req, res) => {
    let {category} = req.query;
    let filtered = swag.filter(item => {
      return item.category === category
    });

    if(filtered.length > 0) {
      res.status(200).send(filtered);
    } else {
      res.status(200).send(swag);
    }
  }
}