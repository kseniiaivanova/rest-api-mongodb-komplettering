const { NotFoundError, BadRequestError } = require("../utils/errors");
const Participant = require("../models/participant");
const DanceClass = require("../models/danceClass");

exports.updateParticipant = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const { email, betalningsstatus } = req.body;

    const participantToUpdate = await Participant.findById(participantId);

    if (!participantToUpdate) throw new NotFoundError("Deltagaren med den här id finns inte!");

    if (email) participantToUpdate.email = email;
    if (betalningsstatus) participantToUpdate.betalningsstatus = betalningsstatus;
    
    const updatedParticipant = await participantToUpdate.save();

    return res.json(updatedParticipant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ett fel inträffade vid uppdatering av deltagaren.");
  }
};


exports.deleteParticipantFromClass = async (req, res) => {
  const { danceClassId, participantId } = req.body;

  try {
    const participantToDelete = await Participant.findOneAndDelete({
      _id: participantId,
      danceClass: danceClassId,
    });

    if (!participantToDelete) {
      return res
        .status(404)
        .json({
          message: `Deltagaren med id ${participantId} finns inte i klass med id ${danceClassId}`,
        });
    }

    const danceClassToUpdate = await DanceClass.findById(danceClassId);

    if (!danceClassToUpdate) {
      throw new NotFoundError(`Klass med id ${danceClassId} kunde inte hittas`);
    }

    
    await danceClassToUpdate.save();

    return res.json({
      message: `Deltagare med id ${participantId} har tagits bort`
    });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      return res.status(error).json({ message: error.message });
    }
  }
};