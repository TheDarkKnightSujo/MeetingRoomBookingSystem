const express= require('express');
const router = express.Router();
const db=require("../models");
const jwt=require('jsonwebtoken');
require('dotenv').config(); 
const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");

const Booking=db.booking;
const Participants=db.participants;
const Meeting_Minutes=db.meeting_minutes;
const MeetingRoom=db.meetingroom;
const User=db.users;


router.get('/',verifyAdmin,async(_,res)=>{
    try{
        const Bookings=await Booking.findAll();
        return res.json(Bookings);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
// router.get('/my',async(req,res)=>{
//   try{
//         const booking=await Booking.findAll({where:{User_ID:req.user.User_ID}},{
//           attributes:{exclude:['Booking_ID']} 
//         });
//         const room=await MeetingRoom.findByPk(req.user.Room_ID);
//         return res.json(booking,room);
//     }
//     catch(err){
//         console.error("Error fetching data",err);
//         res.status(500).json({error:"Server Error"});
//     }
// });
// router.get('/my', verifyJwt,async (req, res) => {
//   try {
//     const userId = req.user.User_ID;

//     // Get bookings created by the user
//     const bookedByMe = await Booking.findAll({
//       where: { User_ID: userId },
//       include: [
//   {
//     model: db.users,
//     as: "User",
//     attributes: ["First_Name", "Last_Name"],
//   },
//   {
//     model: MeetingRoom,
//     as: "MeetingRoom",
//     attributes: ["Room_ID","Name"],
//   },
//   {
//     model: db.participants,
//     as: "Participants",
//     attributes: ["User_ID"],
//   }
// ]

//     });

//     // Get Booking IDs where user is a participant
//     const participantEntries = await Participants.findAll({
//       where: { User_ID: userId },
//       attributes: ['Booking_ID']
//     });

//     const bookingIds = participantEntries.map(p => p.Booking_ID);

//     // Get those bookings (excluding duplicates)
//     const invitedTo = await Booking.findAll({
//       where: {
//         Booking_ID: bookingIds
//       },
//       include: [
//         {
//           model: db.users,
//           as:"User",
//           attributes: ['First_Name', 'Last_Name']
//         },
//         {
//           model: db.meetingroom,
//           as:"MeetingRoom",
//           attributes: ['Name']
//         },
//         {
//           model: Participants,
//           attributes: ['User_ID']
//         }
//       ]
//     });

//     // Merge & deduplicate
//     const all = [...bookedByMe, ...invitedTo];
//     const uniqueMap = new Map();
//     all.forEach(b => uniqueMap.set(b.Booking_ID, b));
//     const uniqueBookings = Array.from(uniqueMap.values());
//     const now = new Date();

//     const determineStatus = (startTime, endTime) => {
//       startTime = new Date(startTime);
//       endTime = new Date(endTime);
//       if (now < startTime) return "Upcoming";
//       if (now >= startTime && now <= endTime) return "Ongoing";
//       return "Past";
//     };

//     const bookingsWithStatus = uniqueBookings.map((b) => {
//       const json = b.toJSON();
//       json.Status = determineStatus(json.Start_Time, json.End_Time);
//       return json;
//     });
//     res.json(bookingsWithStatus);
//   } catch (err) {
//     console.error("Error in /bookings/my:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
  router.get('/my', verifyJwt, async (req, res) => {
  try {
    const userId = req.user.User_ID;

    // Get bookings created by the user
    const bookedByMe = await Booking.findAll({
      where: { User_ID: userId },
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["First_Name", "Last_Name"],
        },
        {
          model: MeetingRoom,
          as: "MeetingRoom",
          attributes: ["Room_ID", "Name"],
        },
        {
          model: db.participants,
          as: "Participants",
          attributes: ["User_ID"],
        }
      ]
    });

    // Get Booking IDs where user is a participant
    const participantEntries = await Participants.findAll({
      where: { User_ID: userId },
      attributes: ['Booking_ID']
    });

    const bookingIds = participantEntries.map(p => p.Booking_ID);

    // Get those bookings (excluding duplicates)
    const invitedTo = await Booking.findAll({
      where: {
        Booking_ID: bookingIds
      },
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ['First_Name', 'Last_Name']
        },
        {
          model: db.meetingroom,
          as: "MeetingRoom",
          attributes: ['Room_ID', 'Name']
        },
        {
          model: Participants,
          as: "Participants",
          attributes: ['User_ID']
        }
      ]
    });

    // Merge & deduplicate
    const all = [...bookedByMe, ...invitedTo];
    const uniqueMap = new Map();
    all.forEach(b => uniqueMap.set(b.Booking_ID, b));
    const uniqueBookings = Array.from(uniqueMap.values());
    const now = new Date();

    const determineStatus = (startTime, endTime) => {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (now < start) return "Upcoming";
      if (now >= start && now <= end) return "Ongoing";
      return "Past";
    };

    const bookingsWithStatusAndIST = uniqueBookings.map((b) => {
      const json = b.toJSON();

      const startUTC = new Date(json.Start_Time);
      const endUTC = new Date(json.End_Time);

      const formatOptions = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };

      json.Status = determineStatus(json.Start_Time, json.End_Time);
      json.Start_Time_IST = startUTC.toLocaleString("en-GB", formatOptions);
      json.End_Time_IST = endUTC.toLocaleString("en-GB", formatOptions);

      return json;
    });

    res.json(bookingsWithStatusAndIST);
  } catch (err) {
    console.error("Error in /bookings/my:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {User_ID,Title,Start_Time,End_Time} = req.body;

  try {
    const [updated] = await Booking.update(
      {User_ID,Title,Start_Time,End_Time},
      { where: { Booking_ID: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Booking not found or no changes made" });
    }

    const updatedBooking = await Booking.findByPk(id);
    res.json({ message: "Booking updated", data: updatedBooking });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update Booking" });
  }
});
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
      await Participants.destroy({
      where: { Booking_ID: id }
    });
    const booking = await Booking.destroy({where:{Booking_ID:id}});

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to delete Booking" });
  }
});

//participants
router.get('/:bookingId/participants',async(req,res)=>{
  const id=req.params.bookingId;
    try{
        const Participant=await Participants.findAll({where:{Booking_ID:id}});
        return res.json(Participant);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.post('/:bookingId/participants', async (req, res) => {
  
  const Bookingid=req.params.bookingId;
  const { email } = req.body;
  if(!email){
    return res.status(400).json({error:"Please provide email address"});
  }
  const emailList=email.split(',').map(email=>email.trim());
  try{
    const booking =await Booking.findByPk(Bookingid);
    if(!booking){
      return res.status(404).json({error:"Booking not found"});
    }
    const users=await User.findAll({where:{Email:emailList}});
    if(users.length===0){
      return res.status(404).json({error:"Users not found"});
    }
      const participantsData=users.map(user=>({
        Booking_ID:Bookingid,
        User_ID:user.user_ID,
      }));
      const addedParticipants = await Participants.bulkCreate(participantsData);
      return res.json({ message: "Participants added", participants: addedParticipants });
  }
  catch(err){
    console.error("Error adding participants:", err);
    res.status(500).json({ error: "Failed to add participants" });
  }
});
router.put('/:bookingId/participants/:userId', async (req, res) => {
  const Bookingid = req.params.bookingId;
  const Userid=req.params.userId;
  const {Invitation_Status,Notification_Sent} = req.body;

  try {
    const [updated] = await Participants.update(
      {Invitation_Status,Notification_Sent},
      { where: { 
        Booking_ID: Bookingid,
        User_Id:Userid
       }}
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Participant not found or no changes made" });
    }

    const updatedBooking = await Booking.findByPk(id);
    res.json({ message: "Participant updated", data: updatedBooking });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update Participant" });
  }
});
router.delete('/:bookingId/participants/:userId', async(req, res) => {
    const Bookingid = req.params.bookingId;
    const Userid=req.params.userId;
    try {
    const participant = await Participants.destroy({where:{Booking_ID:Bookingid,User_ID:Userid}});

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.json(participant);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch Participant" });
  }
});

//minutes

router.get('/:bookingId/minutes',async(req,res)=>{
  const id=req.params.bookingId;
    try{
        const Meeting_Minute=await Meeting_Minutes.findAll({where:{Booking_ID:id}});
        return res.json(Meeting_Minute);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.post('/:bookingId/minutes',async(req,res)=>{
  const id=req.params.bookingId;
  const {Notes_Text,Attachments_Path}=req.body;
  const booking=await Booking.findByPk({where:{Booking_ID:id}});
  const userID=booking.User_ID;
  if(!Notes_Text||!Attachments_Path)
      return res.status(400).json({error:"Please fill all the details"})
    try{
      const newMinute= await Meeting_Minutes.create({Booking_ID:id,Notes_Text,Attachments_Path,Created_By:userID});
      res.json({ message: "Minute added auccessfully", meeting_minutes: newMinute });
    } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
    }
})
router.put('/:bookingId/minutes', async (req, res) => {
  const id = req.params.bookingId;
  const {Notes_Text,Attachments_Path} = req.body;

  try {
    const [updated] = await Meeting_Minutes.update(
      {Notes_Text,Attachments_Path},
      { where: { Booking_ID: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Minute not found or no changes made" });
    }

    const updatedMinute = await Meeting_Minutes.findByPk(id);
    res.json({ message: "Minutes updated", data: updatedMinute });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update Minutes" });
  }
});
router.delete('/:bookingId/minutes', async(req, res) => {
    const id = req.params.bookingId;
    try {
    
    const minute = await Meeting_Minutes.destroy({where:{Booking_ID:id}});

    if (!minute) {
      return res.status(404).json({ message: "Minutes not found" });
    }
    res.json(minute);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch Minutes" });
  }
});
//recurring

router.post("/recurring",verifyJwt,async(req,res)=>{

});
router.get("/:parentId/instances",verifyJwt,async(req,res)=>{
  
});



module.exports=router;

