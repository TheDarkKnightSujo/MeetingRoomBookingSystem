const express = require("express");
const cors = require("cors");
const db = require("./models");  
const { where } = require("sequelize");
const app = express();
const verifyJWT=require('./verifyJWT.js');
const verifyAdmin=require('./verifyadmin.js');

app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/userroutes.js");
const locationRoutes=require("./routes/locationroutes.js");
const meetingroomRoutes=require("./routes/meetingroomroutes.js");
const roomfeaturesRoutes=require("./routes/roomfeaturesroutes.js");
const bookingRoutes=require("./routes/bookingroutes.js");
const auditlogsRouter=require("./routes/auditlogsroutes.js");
// const mysql=require('mysql2');

// const User = db.users;
// const Location=db.location;
// const MeetingRoom=db.meetingroom;
// const Room_Features=db.room_feature;
// const Booking=db.booking;
// const Participants=db.participants;
// const Meeting_Minutes=db.meeting_minutes;
// const Audit_logs=db.audit_log;
// const Recurring_Booking=db.recurring_bookings;

//users
app.use('/users',userRoutes);
// app.post("/users/register", async (req, res) => {
//   const { First_Name,   Last_Name, Email, Role, password } = req.body;
//   const hashPassword =await bcrypt.hash(password,10);

//   if (!First_Name || !Last_Name || !Email || !Role || !password) {
//     return res.status(400).json({ error: "Please fill all the details" });
//   }

//   try {
//     const newUser = await User.create({ First_Name, Last_Name, Email, Role, password:hashPassword });
//     res.json({ message: "Registered successfully", user: newUser });
//   } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//   }
// });

// app.get('/users',async(_,res)=>{
//     try{
//         const users=await User.findAll();
//         return res.json(users);
//     }
//     catch(err){
//         console.error("Error fetching data",err);
//         res.status(500).json({error:"Server Error"});
//     }
// })







//roomfeatures
app.use("/room-features",roomfeaturesRoutes);
// app.get('/room-features',async(_,res)=>{
//     try{
//         const room_features=await Room_Features.findAll();
//         return res.json(room_features);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.post("/room-features", async (req, res) => {
//   const { Name } = req.body;

//   if (!Name) {
//     return res.status(400).json({ error: "Please fill all the details" });
//   }

//   try {
//     const newRoomFeature = await Room_Features.create({ Name});
//     res.json({ message: "Room Feature added  successfully", room_feature: newRoomFeature });
//     } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//   }
// });
// app.get('/meeting-rooms/:roomId/features',async(req,res)=>{
//     const roomId=req.params.roomId;
//     try{
//         const room=await MeetingRoom.findByPk(roomId,{
//             include:{
//                 model:Room_Features,
//                 through:{attributes:[]}
//             }
//         });
        
//         if (!room) {
//             return res.status(404).json({ error: "Meeting room not found" });
//         }
//         return res.json(room.room_features);
//     } catch (err) {
//         console.error("Error fetching room features:", err);
//         res.status(500).json({ error: "Server error" });
//     }
// });



//locations

app.use('/locations',locationRoutes);

// app.get('/locations',async(_,res)=>{
//     try{
//         const locations=await Location.findAll();
//         return res.json(locations);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.get('/locations/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const location = await Location.findByPk(id);

//     if (!location) {
//       return res.status(404).json({ message: "Location not found" });
//     }
//     res.json(location);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch location" });
//   }
// });
// app.post("/locations", async (req, res) => {
//   const { Name, Address, City, Postal_Code } = req.body;

//   if (!Name || !Address || !City || !Postal_Code) {
//     return res.status(400).json({ error: "Please fill all the details" });
//   }

//   try {
//     const newLocation = await Location.create({ Name, Address, City, Postal_Code});
//     res.json({ message: "Location added  successfully", location: newLocation });
//     } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//   }
// });
// app.put('/locations/:id', async (req, res) => {
//   const id = req.params.id;
//   const { Name, Address, City, Postal_Code } = req.body;

//   try {
//     const [updated] = await Location.update(
//       { Name, Address, City, Postal_Code },
//       { where: { Location_ID: id } }
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Location not found or no changes made" });
//     }

//     const updatedLocation = await Location.findByPk(id);
//     res.json({ message: "Location updated", data: updatedLocation });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update location" });
//   }
// });
// app.delete('/locations/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const location = await Location.destroy({where:{Location_ID:id}});

//     if (!location) {
//       return res.status(404).json({ message: "Location not found" });
//     }
//     res.json(location);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch location" });
//   }
// });





//meetingrooms
app.use('/meeting-rooms',meetingroomRoutes);
// app.get('/meeting-rooms',async(_,res)=>{
//     try{
//         const meetingrooms=await MeetingRoom.findAll();
//         return res.json(meetingrooms);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.get('/locations/:locationId/rooms',async(req,res)=>{
//     const id = req.params.locationId;
//     try{
//         const rooms=await MeetingRoom.findAll({where:{Location_ID:id}});
//         return res.json(rooms);
//     }
//     catch(err){
//         console.error("Error fetching data:",err);
//         res.status(500).json({error:"Server Erron"});
//     }
// });
// app.get('/meeting-rooms/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const room = await MeetingRoom.findByPk(id);

//     if (!room) {
//       return res.status(404).json({ message: "Meeting room not found" });
//     }
//     res.json(room);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch meeting room" });
//   }
// });
// app.post("/locations/:locationId/rooms", async (req, res) => {
//   const { Name, Description, Capacity} = req.body;
//   const id=req.params.locationId;

//   if (!Name || !Description || !Capacity ) {
//     return res.status(400).json({ error: "Please fill all the details" });
//   }
//     console.log("Creating room for location:", id);
//     console.log("Received body:", req.body);    


//   try {
//     const newRoom = await MeetingRoom.create({ Name, Location_ID:id,Description, Capacity});
//     res.json({ message: "Room added  successfully", meeting_room: newRoom });
//     } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//   }
// });
// app.put('/meeting-rooms/:id', async (req, res) => {
//   const id = req.params.id;
//   const { Name, Description, Capacity,Location_ID} = req.body;

//   try {
//     const [updated] = await MeetingRoom.update(
//       { Name, Description, Capacity,Location_ID},
//       { where: { Room_ID: id } }
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Meeting room not found or no changes made" });
//     }

//     const updatedRoom = await MeetingRoom.findByPk(id);
//     res.json({ message: "Meeting room updated", data: updatedRoom });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update meeting room" });
//   }
// });
// app.delete('/meeting-rooms/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const room = await MeetingRoom.destroy({where:{Room_ID:id}});

//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }
//     res.json(room);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch Room" });
//   }
// });


//bookings
app.use("/bookings",verifyJWT,bookingRoutes);
// app.get('/bookings',async(_,res)=>{
//     try{
//         const Bookings=await Booking.findAll();
//         return res.json(Bookings);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.get('/bookings/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const booking = await Booking.findByPk(id);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json(booking);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch booking" });
//   }
// });
//'/bookings/my'
// app.post('/meeting-rooms/:roomId/booking',async(req,res)=>{
    
//     const {User_ID,Title,Start_Time,End_Time}=req.body;
//     const id=req.params.roomId;
//     if(!User_ID||!Title||!Start_Time||!End_Time)
//       return res.status(400).json({error:"Please fill all the details"})
//     try{
//       const newBooking= await Booking.create({Room_ID:id,User_ID,Title,Start_Time,End_Time});
//       res.json({ message: "Booking done successfully", booking: newBooking });
//     } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//     }
// });
// app.put('/bookings/:id', async (req, res) => {
//   const id = req.params.id;
//   const {User_ID,Title,Start_Time,End_Time} = req.body;

//   try {
//     const [updated] = await Booking.update(
//       {User_ID,Title,Start_Time,End_Time},
//       { where: { Booking_ID: id } }
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Booking not found or no changes made" });
//     }

//     const updatedBooking = await Booking.findByPk(id);
//     res.json({ message: "Booking updated", data: updatedBooking });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update Booking" });
//   }
// });
// app.delete('/bookings/:id', async(req, res) => {
//     const id = req.params.id;
//     try {
//     const booking = await Booking.destroy({where:{Booking_ID:id}});

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json(booking);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch Booking" });
//   }
// });


//participants

// app.get('/bookings/:bookingId/participants',async(_,res)=>{
//   const id=req.params.bookingId;
//     try{
//         const Participant=await Participants.findAll({where:{Booking_ID:id}});
//         return res.json(Participant);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.post('/bookings/:bookingId/participants', async (req, res) => {
  
//   const Bookingid=req.params.bookingId;
//   const { email } = req.body;
//   if(!email){
//     return res.status(400).json({error:"Please provide email address"});
//   }
//   const emailList=email.split(',').map(email=>email.trim());
//   try{
//     const booking =await Booking.findByPk(Bookingid);
//     if(!booking){
//       return res.status(404).json({error:"Booking not found"});
//     }
//     const users=await User.findAll({where:{Email:emailList}});
//     if(users.length===0){
//       return res.status(404).json({error:"Users not found"});
//     }
//       const participantsData=users.map(user=>({
//         Booking_ID:Bookingid,
//         User_ID:user.user_ID,
//       }));
//       const addedParticipants = await Participants.bulkCreate(participantsData);
//       return res.json({ message: "Participants added", participants: addedParticipants });
//   }
//   catch(err){
//     console.error("Error adding participants:", err);
//     res.status(500).json({ error: "Failed to add participants" });
//   }
// });
// app.put('/bookings/:bookingId/participants/:userId', async (req, res) => {
//   const Bookingid = req.params.bookingId;
//   const Userid=req.params.userId;
//   const {Invitation_Status,Notification_Sent} = req.body;

//   try {
//     const [updated] = await Participants.update(
//       {Invitation_Status,Notification_Sent},
//       { where: { 
//         Booking_ID: Bookingid,
//         User_Id:Userid
//        }}
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Participant not found or no changes made" });
//     }

//     const updatedBooking = await Booking.findByPk(id);
//     res.json({ message: "Participant updated", data: updatedBooking });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update Participant" });
//   }
// });
// app.delete('/bookings/:bookingId/participants/:userId', async(req, res) => {
//     const Bookingid = req.params.bookingId;
//     const Userid=req.params.userId;
//     try {
//     const participant = await Participants.destroy({where:{Booking_ID:Bookingid,User_ID:Userid}});

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }
//     res.json(participant);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch Participant" });
//   }
// });

//minutes
// app.get('/bookings/:bookingId/minutes',async(req,res)=>{
//   const id=req.params.bookingId;
//     try{
//         const Meeting_Minute=await Meeting_Minutes.findAll({where:{Booking_ID:id}});
//         return res.json(Meeting_Minute);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.post('/bookings/:bookingId/minutes',async(req,res)=>{
//   const id=req.params.bookingId;
//   const {Notes_Text,Attachments_Path}=req.body;
//   const booking=await Booking.findByPk({where:{Booking_ID:id}});
//   const userID=booking.User_ID;
//   if(!Notes_Text||!Attachments_Path)
//       return res.status(400).json({error:"Please fill all the details"})
//     try{
//       const newMinute= await Meeting_Minutes.create({Booking_ID:id,Notes_Text,Attachments_Path,Created_By:userID});
//       res.json({ message: "Minute added auccessfully", meeting_minutes: newMinute });
//     } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ error: "Database insert failed" });
//     }
// })
// app.put('/bookings/:bookingId/minutes', async (req, res) => {
//   const id = req.params.bookingId;
//   const {Notes_Text,Attachments_Path} = req.body;

//   try {
//     const [updated] = await Meeting_Minutes.update(
//       {Notes_Text,Attachments_Path},
//       { where: { Booking_ID: id } }
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Minute not found or no changes made" });
//     }

//     const updatedMinute = await Meeting_Minutes.findByPk(id);
//     res.json({ message: "Minutes updated", data: updatedMinute });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update Minutes" });
//   }
// });
// app.delete('/bookings/:bookingId/minutes', async(req, res) => {
//     const id = req.params.bookingId;
//     try {
//     const minute = await Meeting_Minutes.destroy({where:{Booking_ID:id}});

//     if (!minute) {
//       return res.status(404).json({ message: "Minutes not found" });
//     }
//     res.json(minute);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch Minutes" });
//   }
// });



//recurring meetings
app.post('/bookings/recurring',async(req,res)=>{
  const {}=req.body;

})


//auditlogs
app.use('/audit-logs',auditlogsRouter);
// app.get('/audit-logs',async(_,res)=>{
//     try{
//         const Audit_log=await Audit_logs.findAll();
//         return res.json(Audit_log);
//     }
//     catch(err){
//         console.error(" Error fetching data:", err);
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// app.get('/audit-logs/user/:userId', async(req, res) => {
//     const id = req.params.userId;
//     try {
//     const auditlog = await Audit_logs.findAll({where:{User_ID:id}});

//     if (!auditlog) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(auditlog);
//     } catch (err) {
//     console.error("Fetch by ID error:", err);
//     res.status(500).json({ error: "Failed to fetch User logs" });
//   }
// });

// app.post("/users/login",async(req,res)=>{
//     const {email,password}=req.body;
//     if(!email||!password){
//         return res.status(400).json({ error: "Please fill all the details" });
//     }
//     try {
//     const 
    
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// })

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
