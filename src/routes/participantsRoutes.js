const express = require("express");

const router = express.Router();

 const {
    updateParticipant
    
  } = require("../controllers/participantController");
 



  router.put("/:participantId", updateParticipant)
  
  module.exports = router;