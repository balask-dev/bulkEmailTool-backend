import mongoose from "mongoose";
const user = mongoose.Schema({
    firstName:{type:String,require:true},
    lastName :{type:string,require:true},
    email    :{type:string,require:true},
    password :{type:password}
});
 const userSchemaModel = mongoose.model("users",user);
 export const userSchema = userSchemaModel 
 
const mail = mongoose.Schema({
    To:{
        type:string,
        require:true
    },
    Message:{
        type:string,
        require:true
    },
    date:Date
    });
 const mailSchemaModel = mongoose.model("mails",mail);
 export const mailSchema = mailSchemaModel;
    
 
