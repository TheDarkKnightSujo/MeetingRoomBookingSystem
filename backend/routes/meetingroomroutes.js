const express= require('express');
const router = express.Router();
const db=require("../models");
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
//availabilty
router.get("/:roomId/availability", async (req, res) => {
  const { roomId } = req.params;
  const { date } = req.query;

  if (!date) return res.status(400).json({ error: "Date is required" });

  function generateTimeSlots(date) {
    const slots = [];
    const ranges = [
      { start: "09:00", end: "13:00" },
      { start: "13:30", end: "18:00" },
    ];

    ranges.forEach(({ start, end }) => {
      let startTime = new Date(`${date}T${start}:00`);
      const endTime = new Date(`${date}T${end}:00`);

      while (startTime < endTime) {
        const slotEnd = new Date(startTime.getTime() + 30 * 60 * 1000);
        slots.push({
          start: new Date(startTime),
          end: new Date(slotEnd),
          isBooked: false,
        });
        startTime = slotEnd;
      }
    });

    return slots;
  }

  try {
    const slots = generateTimeSlots(date);

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const bookings = await Booking.findAll({
      where: {
        Room_ID: roomId,
        Start_Time: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    slots.forEach((slot) => {
      for (const booking of bookings) {
        const bookingStart = new Date(booking.Start_Time);
        const bookingEnd = new Date(booking.End_Time);

        if (bookingStart < slot.end && bookingEnd > slot.start) {
          slot.isBooked = true;
          break;
        }
      }
    });

    const formatted = slots.map((slot) => ({
      startTime: slot.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: slot.end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isBooked: slot.isBooked,
    }));

    return res.json(formatted);
  } catch (err) {
    console.error("Error fetching availability:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

//booking
router.post('/:roomId/booking',async(req,res)=>{
    
  const userId=req.userID;
   const { roomId } = req.params;
  const {  title, startTime, endTime } = req.body;

  if (!userId || !title || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  try {
    const conflict = await Booking.findOne({
      where: {
        Room_ID: roomId,
        [Op.or]: [
          {
            Start_Time: {
              [Op.between]: [start, end]
            }
          },
          {
            End_Time: {
              [Op.between]: [start, end]
            }
          },
          {
            [Op.and]: [
              { Start_Time: { [Op.lte]: start } },
              { End_Time: { [Op.gte]: end } }
            ]
          }
        ]
      }
    });

    if (conflict) {
      return res.status(409).json({ error: "This time slot is already booked." });
    }

    const newBooking = await Booking.create({
      Room_ID: roomId,
      User_ID: userId,
      Title: title,
      Start_Time: start,
      End_Time: end,
      Status: "Confirmed",
      Created_At: new Date(),
      Updated_At: new Date(),
    });

    return res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error booking room:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

//meeting room features
router.get('/:roomId/features',async(req,res)=>{
    const roomId=req.params.roomId;
    try{
        const room=await MeetingRoom.findByPk(roomId,{
            include:{
                model:Room_Features,
                as: "features",
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