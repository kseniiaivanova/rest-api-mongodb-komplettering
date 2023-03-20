const express = require("express");

const router = express.Router();

const {
    getAllClasses,
    getActiveClasses,
    addParticipantToClass,
    deleteParticipantFromClass

   
  } = require("../controllers/danceClassController");


  
  router.get("/", getAllClasses);
  router.get("/", getActiveClasses);
  router.post("/:danceclassId/participants", addParticipantToClass);
  router.delete("/:danceclassId/participants/:participantId", deleteParticipantFromClass);
  
  

   
  module.exports = router;
  