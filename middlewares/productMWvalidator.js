const validator = require("../util/productValidator");

const productMWvalidator = (req, res, next) => {
  let valid = validator.validate(req.body);
  if (valid) {
    req.valid = 1;
    next();
  } else res.send("Forbidden command !!");
};

module.exports = productMWvalidator;
