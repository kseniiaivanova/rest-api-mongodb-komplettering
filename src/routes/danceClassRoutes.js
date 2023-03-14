const express = require("express");

const router = express.Router();

const {
    getAllClasses,
    addParticipantToClass,
    deleteParticipantFromClass
  
   
  } = require("../controllers/participantController");


  
  router.get("/", getAllClasses);
  router.post("/:danceclassId/participants", addParticipantToClass);
  router.delete("/:danceclassId/participants", deleteParticipantFromClass);
  
  

   
  module.exports = router;
  