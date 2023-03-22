const { NotFoundError, BadRequestError } = require("../utils/errors");
const DanceClass = require("../models/danceClass");
const Participant = require("../models/participant");


//--------------------------------------------//
exports.getAllClasses = async (req, res, next) => {
  try {
    const danceClasses = await DanceClass.find();

    if (!danceClasses) {
      throw new NotFoundError("Finns inga klasser tyvärr!");
    }

    return res.json({
      data: danceClasses,
    });
  } catch (error) {
    next(error);
  }
};


exports.getActiveClasses = async (req, res, next) => {
  try {

    
  const activeClasses = await DanceClass.find({ active: true });


  if (!activeClasses||activeClasses.length === 0){
      throw new NotFoundError("Finns inga aktiva klasser tyvärr!");
    }

    return res.json({
      data: activeClasses,
    });
  } catch (error) {
    next(error);
  }
};



exports.addParticipantToClass = async (req, res) => {
try {
const danceClassId = req.params.danceClassId;

  const { namn, email, role } = req.body;
  const danceClass = await DanceClass.findById(danceClassId);
      
 if (!danceClass) {
  return res.status(404).send("DanceClass not found");
  }
  
  const totalParticipants = await Participant.find({ danceClass: danceClass._id }).countDocuments();
  const totalLeaders = await Participant.find({ danceClass: danceClass._id, role: "ledare" }).countDocuments();
  const totalFollowers = await Participant.find({ danceClass: danceClass._id, role: "följare" }).countDocuments();
      
      
      
      if (totalParticipants >= 20) {
        return res.status(400).send("Klassen har redan max antal deltagare.");
      }
  
      if (role === "ledare" && totalLeaders >= 10) {
        return res.status(400).send("Klassen har redan max antal ledare.");
      }
  
      if (role === "följare" && totalFollowers >= 10) {
        return res.status(400).send("Klassen har redan max antal följare.");
      }
  
      const participant = new Participant({
        namn,
        email,
        role,
        betalningsstatus: "pending",
        danceClass: danceClass
      });   
  
      await participant.save();
  
      
      danceClass.participants.push(participant.id);
      await danceClass.save();
  
      res.send(participant);
    } catch (error) {
      console.error(error);
      res.status(500).send("Ett fel inträffade vid skapandet av deltagaren.");
    }

 exports.deleteParticipantFromClass = async (req, res) => {

    try {
        const participantId = req.params.id;
        const participant = await Participant.findById(participantId);
    
        if (!participant) throw new NotFoundError(`Deltagare med id ${participantId} hittades inte`);
    
        const danceClass = await DanceClass.findById(participant.danceClass);
    
        if (!danceClass) throw new NotFoundError(`Dansklass för deltagare med id ${participantId} hittades inte`);
    
        // Remove participant from dance class's participants array
        danceClass.participants.pull(participantId);
        await danceClass.save();
    
        // Delete participant
        await participant.remove();
    
        res.send({ message: `Deltagare med id ${participantId} har tagits bort från dansklassen med id ${danceClass._id}` });
      } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: error.message });
      }
    };
    
  }
    
