import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

const users = [
    {
        id : 1,
        name : "Adelin",
        password : "Ostrich@09",
        role : "admin"
    }
]

app.post("/login",(req,res)=>{
    const { uname, password } = req.body;
    const user = users.find(user => user.name === uname && user.password === password );
    if(!user) {
        return res.status(401).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign(
        {
            userId : user.id,
            username : user.name,
            role : user.role
        },
        JWT_SECRET,
        {
            expiresIn : "1h"
        }
    );
    res.json({ token });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message : "token required"
        });
    }


jwt.verify(token, JWT_SECRET, (err,user) => {
    if(err) {
        return res.status(403).json({
            message : "Invalid or expired token"
        });
    }
    req.user = user;
    next();
});
}

app.get("/profile",authenticateToken,(req,res)=>{
    res.json({
        message : "Protected data",
        user : req.user
    });
});

app.listen(3000,()=>{
    console.log("Server running");
})

