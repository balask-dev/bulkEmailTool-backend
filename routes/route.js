import express from "express";
import { connection } from "../index.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
//import { mailSchema } from "../../mailSchema";
const router = express.Router();

// HASHING FUNCTION FOR PASSOWRD
async function genPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(password, salt);
  //console.log({salt,password})
  return hashed;
}

//SIGNUP
router.post("/register", async (req, res) => {
   
  let name = req.body.data.name;
  let email = req.body.data.email;
  let password = req.body.data.password;
  let hash = await genPassword(password);
  let newUser = {
    userName: name,
    email :email,
    password: hash
  };
  let user = await connection
    .db("bmail")
    .collection("user")
    .insertOne({ newUser });
  res.send("Account Created Successfully", "Log in", user);
});
 

//GET ALL USRES
router.get("/users", async (req, res) => {
  let data = await connection.db("bmail").collection("users").find({});
  res.send(data);
});

//LOGIN
router.post("/login", async (req, res) => {
  let username = req.body.data.userName;
  let user = await connection.db("bmail").collection("user").findOne({userName:username});
  if (!user){
     res.send({ message: "Please Enter Valid credentials" });
  }else {
    res.send(user,"Logged In");
  }
});

//COMPOSE MAIL
router.post("/compose", async (req, res) => {
 
  let { data } = req.body;
  let From = req.body.data.From;
  let To = req.body.data.To;
  let Password = req.body.data.Password;
  let Service = req.body.data.Service;
  let Message = req.body.data.Message;

  let mail = await connection.db("bmail").collection("mail").insertOne({From: data.From,Password: data.Password,To: data.To,Message: data.Message,});

  // USER
  async function main() {
  
    let testAccount = await nodemailer.createTestAccount();
  
     let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 4000,
      secure: false,  
      auth: {
        user: {From},  
        pass: {Password},  
      },
    });
  
    // SEND MAIL WITH DEFINED TRANSPORT
    let info = await transporter.sendMail({
      from: {From}, 
      to: {To}, 
      subject: "From node!", 
      text: {Message}, 
     
    });
  }
  
  main().catch(console.error);

  res.send("completed")
});

//GET ALL MAILS
 router.get("/mails", (req, res) => {
     let data = connection.db("bmail").collection("mail").find({})
     res.send(data);
 });

export const route = router;

 