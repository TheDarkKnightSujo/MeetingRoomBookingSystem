const express= require('express');
const router = express.Router();
const db=require("./models");
const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");

const User=db.users;
const Recurring = db.recurring_bookings;
const Participants = db.participants;
const Booking=db.booking;

router.get('/me',verifyJwt,async(req,res)=>{
  try{
        const user=await User.findbyPk(req.user.User_ID,{
          attributes:{exclude:['password']} 
        });
        return res.json(user);
    }
    catch(err){
        console.error("Error fetching data",err);
        res.status(500).json({error:"Server Error"});
    }
});
router.get('/',verifyJwt,verifyAdmin,async(_,res)=>{

    try{
        const users=await User.findAll({attributes:{exclude:password}});
        return res.json(users);
    }
    catch(err){
        console.error("Error fetching data",err);
        res.status(500).json({error:"Server Error"});
    }
});
router.get('/:id',verifyJwt,verifyAdmin,async(req,res)=>{
  const userID=req.params.id;
  try{
    const user=await User.findbyPk(userID,{attributes:{exclude:password}});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  }catch(err){
    console.error("Error fetching data",err);
    res.status(500).json({error:"Server Error"});
  }
})
router.post("/register", async (req, res) => {
  const { First_Name, Last_Name, Email, Role, password } = req.body;
  const hashPassword =await bcrypt.hash(password,10);

  if (!First_Name || !Last_Name || !Email || !Role || !password) {
    return res.status(400).json({ error: "Please fill all the details" });
  }

  try {
    const newUser = await User.create({ First_Name, Last_Name, Email, Role, password:hashPassword });
    res.json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});
router.post("/login",async(req,res)=>{
  const {Email,password}=req.body;
  if(!Email || !password){
    return res.status(400).json({error:"Please fill all the details"});
  }
  try{
    const user=await User.findOne({where:{Email}});
    if(!user || !(await bcrypt.compare(password,user.password))){
      return res.status(400).json({error:"Invalid username or password"});
    }
    const refreshToken = jwt.sign(
      { User_ID: user.User_ID, Email: user.Email, Role: user.Role },
      REFERSH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie('jwt', refreshToken , {httpOnly:true,maxAge:24*60*60*1000});
    res.json({refreshToken});
  }catch(err){
    res.status(401);
  }
});
router.post("/logout", (_, res) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict" });
  res.status(200).json({ message: "Logged out successfully" });
});
router.put('/me',verifyJwt,async(req,res)=>{
  const {First_Name,Last_Name,Email,password}=req.body;
  try{
    const userID= req.user.User_ID;
    const currentuser=await User.findbyPk(userID);
    if(!currentuser){
      res.status(404).json({error:"User not found"});
    }
    if (First_Name) currentuser.First_Name = First_Name;
    if (Last_Name) currentuser.Last_Name = Last_Name;
    if (Email) currentuser.Email = Email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      currentuser.password = hashedPassword;
    }
    await currentuser.save();
    res.json(currentuser);
  }
  catch(err){
    console.error("Error updating user details");
    res.status(500).json({error:"Update failed"});
  }
});
router.put('/me',verifyJwt,verifyAdmin,async(req,res)=>{
  const {First_Name,Last_Name,Email,password,Role}=req.body;
  try{
    const userID= req.user.User_ID;
    const currentuser=await User.findbyPk(userID);
    if(!currentuser){
      res.status(404).json({error:"User not found"});
    }
    if (First_Name) currentuser.First_Name = First_Name;
    if (Last_Name) currentuser.Last_Name = Last_Name;
    if (Email) currentuser.Email = Email;
    if(Role)currentuser.Role=Role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      currentuser.password = hashedPassword;
    }
    await currentuser.save();
    res.json(currentuser);
  }
  catch(err){
    console.error("Error updating user details");
    res.status(500).json({error:"Update failed"});
  }
});
router.delete('/me',verifyJwt,async(req,res)=>{
  const id=req.user.User_ID;
  try{
    const currentuser = await User.destroy({where:{User_ID:id}});

    if (!currentuser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(currentuser);
  }catch(err){
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});



module.exports=router;