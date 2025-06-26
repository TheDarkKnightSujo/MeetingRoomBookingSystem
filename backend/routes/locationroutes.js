const express= require('express');
const router = express.Router();
const db=require("./models");

const Location=db.location;
const MeetingRoom=db.meeting

router.get('/',async(_,res)=>{
    try{
        const locations=await Location.findAll();
        return res.json(locations);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});
router.post("/", async (req, res) => {
  const { Name, Address, City, Postal_Code } = req.body;

  if (!Name || !Address || !City || !Postal_Code) {
    return res.status(400).json({ error: "Please fill all the details" });
  }

  try {
    const newLocation = await Location.create({ Name, Address, City, Postal_Code});
    res.json({ message: "Location added  successfully", location: newLocation });
    } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { Name, Address, City, Postal_Code } = req.body;

  try {
    const [updated] = await Location.update(
      { Name, Address, City, Postal_Code },
      { where: { Location_ID: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Location not found or no changes made" });
    }

    const updatedLocation = await Location.findByPk(id);
    res.json({ message: "Location updated", data: updatedLocation });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update location" });
  }
});
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
    const location = await Location.destroy({where:{Location_ID:id}});

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});


//meeting room
router.get('/:locationId/rooms',async(req,res)=>{
    const id = req.params.locationId;
    try{
        const rooms=await MeetingRoom.findAll({where:{Location_ID:id}});
        return res.json(rooms);
    }
    catch(err){
        console.error("Error fetching data:",err);
        res.status(500).json({error:"Server Erron"});
    }
});

app.post("/:locationId/rooms", async (req, res) => {
  const { Name, Description, Capacity} = req.body;
  const id=req.params.locationId;

  if (!Name || !Description || !Capacity ) {
    return res.status(400).json({ error: "Please fill all the details" });
  }
    console.log("Creating room for location:", id);
    console.log("Received body:", req.body);    


  try {
    const newRoom = await MeetingRoom.create({ Name, Location_ID:id,Description, Capacity});
    res.json({ message: "Room added  successfully", meeting_room: newRoom });
    } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});
module.exports=router;