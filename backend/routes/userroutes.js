const express= require('express');
const router = express.Router();
const db=require("./models");

const User=db.users;

router.get('/',async(_,res)=>{
    try{
        const users=await User.findAll();
        return res.json(users);
    }
    catch(err){
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


module.exports=router;