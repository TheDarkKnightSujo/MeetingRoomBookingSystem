// const jwt=require('jsonwebtoken');
// require('dotenv').config();

// const verifyJWT =(req,res,next)=>{
//     const authHeader=req.headers['authorization'];
//     if(!authHeader)
//         return res.sendStatus(401);
//     console.log(authHeader);//Bearer token
//     const token= req.cookies?.jwt;
//     jwt.verify(
//         token,
//         process.env.REFERSH_TOKEN_SECRET,
//         (err,decoded)=>{
//             if(err)
//                 return res.sendStatus(403);
//             req.user=decoded;
//             next();
//         }
//     );
// }
// module.exports=verifyJWT;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token in Authorization header");
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1]; // Get token after 'Bearer '

  jwt.verify(token, process.env.REFERSH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(" Invalid token");
      return res.sendStatus(403);
    }
    console.log(" Token verified, user:", decoded);

    req.user = decoded; 
    next();
  });
};

module.exports = verifyJWT;
