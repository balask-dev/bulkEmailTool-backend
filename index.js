import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { route } from "./routes/route.js";
app.use(cors({origin: "*",}));
app.use(express.json());
dotenv.config();

// MONGO DB CONNECTION  "mongodb+srv://bala2:ylhio9xQKOksuK2y@bmail.c6yrj.mongodb.net"
const URL = process.env.URL;
let PORT = process.env.PORT;
 

//MIDDLEWARE
//app.use(bodyParser.urlencoded({ extended: false }))
app.use("/bmail", route);

//CONNECTION STATUS
app.get("/", (req, res) => {
  res.send("connected");
});



async function createConnection() {
  const connection = new MongoClient(URL, {useNewUrlParser: true,useUnifiedTopology: true,});
  await connection.connect();
  console.log("connected ");
  return connection;
}
createConnection();

export const connection = await createConnection();

app.listen(PORT);
