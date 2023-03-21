const catchErrors = (fn) => {
    return function (req, res, next) {
      return fn(req, res, next).catch(next);
    };
  };
  
  class CustomAPIError extends Error {
    constructor(message) {
      super(message);
    }
  }
  
  class BadRequestError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = 400;
      this.name = "BadRequestError";
    }
  }
  
  class NotFoundError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = 404;
      this.name = "NotFoundError";
    }
  }
  
  module.exports = {
    catchErrors,
    NotFoundError,
    BadRequestError,
<<<<<<< HEAD
  };
  
=======
  };
>>>>>>> 2f8dc7735361d5597a09887e2ba4cb31a3b80f0d
