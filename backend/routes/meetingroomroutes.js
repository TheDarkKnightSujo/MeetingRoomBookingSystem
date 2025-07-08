const express= require('express');
const router = express.Router();
const db=require("../models");
const jwt=require('jsonwebtoken');
require('dotenv').config();
const { Op, Sequelize } = require("sequelize");
const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");
const verifyJWT = require('../verifyJWT');

const MeetingRoom=db.meetingroom;
const Booking=db.booking;
const Participants=db.participants;
const Users=db.users;
const RoomFeature = db.room_feature;
const Location = db.location;

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
// router.get("/:roomId/availability", async (req, res) => {
//   const { roomId } = req.params;
//   const { date } = req.query;

//   if (!date) return res.status(400).json({ error: "Date is required" });

//   function generateTimeSlots(date) {
//   const slots = [];
//   const ranges = [
//     { start: "09:00", end: "13:00" },
//     { start: "13:30", end: "18:00" },
//   ];

//   ranges.forEach(({ start, end }) => {
//     let [startH, startM] = start.split(":").map(Number);
//     let [endH, endM] = end.split(":").map(Number);

//     let startMinutes = startH * 60 + startM;
//     const endMinutes = endH * 60 + endM;

//     while (startMinutes < endMinutes) {
//       const hours = String(Math.floor(startMinutes / 60)).padStart(2, "0");
//       const minutes = String(startMinutes % 60).padStart(2, "0");

    
//       const slotStart = new Date(`${date}   ${hours}:${minutes}:00`);
//       const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

//       slots.push({
//         start: slotStart,
//         end: slotEnd,
//         isBooked: false,
//       });

//       startMinutes += 30;
//     }
//   });

//   return slots;
// }

//   try {
//     const slots = generateTimeSlots(date);

//     const startOfDay = `${date}00:00:00`;
//     const endOfDay = `${date}23:59:59`;

//     const bookings = await Booking.findAll({
//       where: {
//         Room_ID: roomId,
//         Start_Time: {
//           [Op.between]: [startOfDay, endOfDay],
//         },
//       },
//     });

//     slots.forEach((slot) => {
//       for (const booking of bookings) {
//         const bookingStart = new Date(booking.Start_Time);
//         const bookingEnd = new Date(booking.End_Time);

//         if (bookingStart < slot.end && bookingEnd > slot.start) {
//           slot.isBooked = true;
//           break;
//         }
//       }
//     });

//     const formatted = slots.map((slot) => ({
//   startTime: slot.start.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone:"Asia/Kolkata"
//   }),
//   endTime: slot.end.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone:"Asia/Kolkata"
//   }),
//   isBooked: slot.isBooked,
// }));


//     return res.json(formatted);
//   } catch (err) {
//     console.error("Error fetching availability:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });
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

  const [year, month, day] = date.split("-").map(Number);

  ranges.forEach(({ start, end }) => {
    let [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    let startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    while (startMinutes < endMinutes) {
      // 👇 This is now based on local IST time
      const slotStart = new Date(year, month - 1, day, 0, 0, 0); // Local time
      slotStart.setMinutes(startMinutes);
      const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

      slots.push({
        start: new Date(slotStart),
        end: new Date(slotEnd),
        isBooked: false,
      });

      startMinutes += 30;
    }
  });

  return slots;
}

  try {
    const slots = generateTimeSlots(date);

    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

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

    const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata"
});

const formatted = slots.map((slot) => ({
  startTime: slot.start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }),
  endTime: slot.end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }),
  isBooked: slot.isBooked,
}));



    return res.json(formatted);
    console.log("Raw UTC slot.start:", slot.start.toISOString());
console.log("India time:", formatter.format(slot.start));
  } catch (err) {
    console.error(" Availability route error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

//booking
// router.post('/:roomId/booking',async(req,res)=>{
    
//   const userId=req.userID;
//    const { roomId } = req.params;
//   const {  title, startTime, endTime } = req.body;

//   if (!userId || !title || !startTime || !endTime) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const start = new Date(startTime);
//   const end = new Date(endTime);

//   try {
//     const conflict = await Booking.findOne({
//       where: {
//         Room_ID: roomId,
//         [Op.or]: [
//           {
//             Start_Time: {
//               [Op.between]: [start, end]
//             }
//           },
//           {
//             End_Time: {
//               [Op.between]: [start, end]
//             }
//           },
//           {
//             [Op.and]: [
//               { Start_Time: { [Op.lte]: start } },
//               { End_Time: { [Op.gte]: end } }
//             ]
//           }
//         ]
//       }
//     });

//     if (conflict) {
//       return res.status(409).json({ error: "This time slot is already booked." });
//     }

//     const newBooking = await Booking.create({
//       Room_ID: roomId,
//       User_ID: userId,
//       Title: title,
//       Start_Time: start,
//       End_Time: end,
//       Status: "Confirmed",
//       Created_At: new Date(),
//       Updated_At: new Date(),
//     });

//     return res.status(201).json(newBooking);
//   } catch (err) {
//     console.error("Error booking room:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });

//meeting room features


router.post('/:roomId/bookings',verifyJWT, async (req, res) => {
  const userId = req.user.User_ID;
  const { roomId } = req.params;
  const { title, startTime, endTime, participants = [] } = req.body;

  if (!userId || !title || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const start = startTime;
  const end = endTime;

  try {
    // 🛑 1. Check for time conflicts in the same room
    const conflict = await Booking.findOne({
    where: {
    Room_ID: roomId,
    Start_Time: { [Op.lt]: end },
    End_Time: { [Op.gt]: start }
    }
    });


    if (conflict) {
      return res.status(409).json({ error: "This time slot is already booked for this room." });
    }

    // 🛑 2. Check for user's own conflicting bookings (as owner or participant)
    const userConflicts = await Booking.findAll({
      where: {
        [Op.or]: [
          { User_ID: userId },
          {
            Booking_ID: {
              [Op.in]: Sequelize.literal(`(SELECT Booking_ID FROM participants WHERE User_ID = ${userId})`)
            }
          }
        ],
        [Op.and]: [
          { Start_Time: { [Op.lt]: end } },
          { End_Time: { [Op.gt]: start } }
        ]
      }
    });

    if (userConflicts.length > 0) {
      return res.status(409).json({ error: "You already have a meeting at this time." });
    }

    // 🛑 3. Check each participant for conflicts
    for (const email of participants) {
      const participant = await Users.findOne({ where: { Email: email } });
      if (!participant) continue;

      const participantConflicts = await Booking.findAll({
        where: {
          [Op.or]: [
            { User_ID: participant.User_ID },
            {
              Booking_ID: {
                [Op.in]: Sequelize.literal(`(SELECT Booking_ID FROM participants WHERE User_ID = ${participant.User_ID})`)
              }
            }
          ],
          [Op.and]: [
            { Start_Time: { [Op.lt]: end } },
            { End_Time: { [Op.gt]: start } }
          ]
        }
      });

      if (participantConflicts.length > 0) {
        return res.status(409).json({ error: `Participant ${email} is unavailable at this time.` });
      }
    }

    // ✅ 4. Create the booking
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

    // ✅ 5. Add participants
    for (const email of participants) {
      const participant = await Users.findOne({ where: { Email: email } });
      if (participant) {
        await Participants.create({
          Booking_ID: newBooking.Booking_ID,
          User_ID: participant.User_ID
        });
      }
    }

    return res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Error booking room:", err);
    return res.status(500).json({ error: "Server error" });
  }
});



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

