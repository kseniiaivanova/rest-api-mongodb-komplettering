const { NotFoundError, BadRequestError } = require("../utils/errors");
const DanceClass = require("../models/danceClass");
const Participant = require("../models/participant");
//const { products } = require("../../seedDB/products");

//--------------------------------------------//
exports.getAllClasses = async (req, res) => {
  
  const danceClasses = await DanceClass.find();

  if (!danceClasses) throw new NotFoundError("Finns inga klasser tyvärr!");

    return res.json({
    data: danceClasses,
    
    
  });
};


exports.getActiveClasses = async (req, res) => {

  const activeClasses = await DanceClass.find({status: "aktiv"});
  if (!activeClasses) throw new NotFoundError("Finns inga aktiva klasser tyvärr!");
  
  return res.json(activeClasses)

}


exports.addParticipantToClass = async (req, res) => {
    try {
      const danceClass = await DanceClass.findById(req.params.id);
      const { namn, email, role } = req.body;
  
      // Kontrollera antalet deltagare i klassen
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
        danceClass: danceClass._id
      });
  
      await participant.save();
  
      // Lägg till deltagaren i klassen
      danceClass.participants.push(participant._id);
      await danceClass.save();
  
      res.send(participant);
    } catch (error) {
      console.error(error);
      res.status(500).send("Ett fel inträffade vid skapandet av deltagaren.");
    }
  };

