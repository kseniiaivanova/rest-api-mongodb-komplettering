const express = require("express");

const router = express.Router();

 const {updateParticipant} = require("../controllers/participantController");
 const {deleteParticipantFromClass} = require("../controllers/participantController");
 



  router.put("/:participantId", updateParticipant)
  router.delete("/:participantId", deleteParticipantFromClass)
  
  module.exports = router;