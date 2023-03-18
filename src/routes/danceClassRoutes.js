const express = require("express");

const router = express.Router();

const {
    getAllClasses,
    addParticipantToClass,
    //deleteParticipantFromClass

   
  } = require("../controllers/danceClassController");


  
  router.get("/", getAllClasses);
  router.post("/:danceclassId/participants", addParticipantToClass);
  //router.delete("/:danceclassId/participants/:participantId", deleteParticipantFromClass);
  
  

   
  module.exports = router;
  