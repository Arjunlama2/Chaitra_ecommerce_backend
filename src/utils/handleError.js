const { model } = require("mongoose");

const handleError = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name == "ValidationError") {
    status = 400;

    if (err.details) {
      let message = "";
      err.details.map((el) => {
        message += `${el.path} is required, `;
      });
      status = 400;
      res.status(status).send({ message });
    }
  if(err.errors){
        msg = "Bad Request / Validation Error";
    statusCode = 400;
    let errsArray = Object.entries(err.errors);
    errors = [];

    errsArray.forEach((el) => {
      errors.push({
        field: el[0],
        msg: el[1].message,
      });
    });
  }

  res.status(statusCode).send({
    msg,
    errors,
   
  });
  }else{
    res.status(statu).send({message})
  }
  }


module.exports = {
  handleError,
};

// 400// client
// 500/servver
// model
// joi
