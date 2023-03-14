const { NotFoundError, BadRequestError } = require("../utils/errors");
const DanceClass = require("../models/danceClass");
const Participant = require("../models/participant");
//const { products } = require("../../seedDB/products");

//--------------------------------------------//
exports.getAllClasses = async (req, res) => {
  const danceClasses = await DanceClass.find();

  if (!danceClasses) throw new NotFoundError("There are no carts to show");

  

  return res.json({
    data: danceClasses,
    /* meta: {
      total: totalCartsInDatabase,
      count: carts.length,
    }, */
  });
};