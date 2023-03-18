const { NotFoundError, BadRequestError } = require("../utils/errors");
const Participant = require("../models/participant");



exports.updateParticipant = async (req, res) => {
  const participantId = req.params.participantId;
  const { email, betalningsstatus } = req.body;

  const participantToUpdate = await Participant.findById(participantId);

  if (!participantToUpdate) throw new NotFoundError("Deltagaren med den här id finns inte!");

  if (email) participantToUpdate.email = email;
  if (betalningsstatus) participantToUpdate.betalningsstatus = betalningsstatus;
  
  const updatedParticipant = await participantToUpdate.save();

  return res.json(updatedParticipant);

  
};
