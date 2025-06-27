const express= require('express');
const router = express.Router();
const db=require("./models");
const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");

const Room_Features=db.room_feature;

router.get('/',async(_,res)=>{
    try{
        const room_features=await Room_Features.findAll();
        return res.json(room_features);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.post("/",verifyJwt,verifyAdmin, async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res.status(400).json({ error: "Please fill all the details" });
  }

  try {
    const newRoomFeature = await Room_Features.create({ Name});
    res.json({ message: "Room Feature added  successfully", room_feature: newRoomFeature });
    } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

module.exports=router;