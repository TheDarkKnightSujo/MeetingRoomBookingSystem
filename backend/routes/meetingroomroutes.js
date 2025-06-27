const express= require('express');
const router = express.Router();
const db=require("./models");
const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");

const MeetingRoom=db.meeting;
const Booking=db.booking;

router.get('/',async(_,res)=>{
    try{
        const meetingrooms=await MeetingRoom.findAll();
        return res.json(meetingrooms);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
    const room = await MeetingRoom.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Meeting room not found" });
    }
    res.json(room);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch meeting room" });
  }
});
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { Name, Description, Capacity,Location_ID} = req.body;

  try {
    const [updated] = await MeetingRoom.update(
      { Name, Description, Capacity,Location_ID},
      { where: { Room_ID: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Meeting room not found or no changes made" });
    }

    const updatedRoom = await MeetingRoom.findByPk(id);
    res.json({ message: "Meeting room updated", data: updatedRoom });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update meeting room" });
  }
});
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
    const room = await MeetingRoom.destroy({where:{Room_ID:id}});

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch Room" });
  }
});

//booking
router.post('/:roomId/booking',async(req,res)=>{
    
    const {User_ID,Title,Start_Time,End_Time}=req.body;
    const id=req.params.roomId;
    if(!User_ID||!Title||!Start_Time||!End_Time)
      return res.status(400).json({error:"Please fill all the details"})
    try{
      const newBooking= await Booking.create({Room_ID:id,User_ID,Title,Start_Time,End_Time});
      res.json({ message: "Booking done successfully", booking: newBooking });
    } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
    }
});

//meeting room features
router.get('/:roomId/features',async(req,res)=>{
    const roomId=req.params.roomId;
    try{
        const room=await MeetingRoom.findByPk(roomId,{
            include:{
                model:Room_Features,
                through:{attributes:[]}
            }
        });
        
        if (!room) {
            return res.status(404).json({ error: "Meeting room not found" });
        }
        return res.json(room.room_features);
    } catch (err) {
        console.error("Error fetching room features:", err);
        res.status(500).json({ error: "Server error" });
    }
});
router.post('/:roomId/features',verifyJwt,verifyAdmin,async(req,res)=>{
  const Room_ID=req.params.roomId;
  const {Name}=req.body;
  if (!Name) {
    return res.status(400).json({ error: "Feature name is required" });
  }
  try{
    const room = await db.meetingroom.findByPk(Room_ID);
    if (!room) {
      return res.status(404).json({ error: "Meeting room not found" });
    }

    let [feature] = await db.room_feature.findOrCreate({
      where: { Name },
    });
    await room.addRoom_feature(feature);
  }catch (err) {
        console.error("Error adding room features:", err);
        res.status(500).json({ error: "Server error" });
  }
});
router.delete('/:roomId/features/:featureId', verifyJwt, verifyAdmin, async (req, res) => {
  const { roomId, featureId } = req.params;

  try {
    const room = await MeetingRoom.findByPk(roomId);
    const feature = await RoomFeature.findByPk(featureId);

    if (!room || !feature) {
      return res.status(404).json({ error: "Room or Feature not found" });
    }

    await room.removeRoom_feature(feature); 
    res.json({ message: "Feature removed from room" });
  } catch (err) {
    console.error("Error removing feature from room:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

module.exports=router;