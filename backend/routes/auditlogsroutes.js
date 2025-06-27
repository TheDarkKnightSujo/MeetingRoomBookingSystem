const express= require('express');
const router = express.Router();
const db=require("./models");
const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJwt=require("../verifyJWT");
const verifyAdmin=require("../verifyadmin");

const Audit_logs=db.audit_log;
router.get('/',verifyJwt,verifyAdmin,async(_,res)=>{
    try{
        const Audit_log=await Audit_logs.findAll();
        return res.json(Audit_log);
    }
    catch(err){
        console.error(" Error fetching data:", err);
        res.status(500).json({ error: "Server Error" });
    }
});
router.get('/user/:userId', async(req, res) => {
    const id = req.params.userId;
    try {
    const auditlog = await Audit_logs.findAll({where:{User_ID:id}});

    if (!auditlog) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(auditlog);
    } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch User logs" });
  }
});



module.exports=router;