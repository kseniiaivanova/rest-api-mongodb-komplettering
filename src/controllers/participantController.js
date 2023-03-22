const { NotFoundError, BadRequestError } = require("../utils/errors");
const Participant = require("../models/participant");


exports.updateParticipant = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const { email, betalningsstatus } = req.body;

    const participantToUpdate = await Participant.findById(participantId);

    if (!participantToUpdate) throw new NotFoundError("Deltagaren med den här id finns inte!");

    if (!email || !betalningsstatus) {
      throw new BadRequestError("You must ange email and betalningsstatus!");
    }

    if (email) participantToUpdate.email = email;
    if (betalningsstatus) participantToUpdate.betalningsstatus = betalningsstatus;
    
    const updatedParticipant = await participantToUpdate.save();

    return res.json(updatedParticipant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ett fel inträffade vid uppdatering av deltagaren.");
  }
};


