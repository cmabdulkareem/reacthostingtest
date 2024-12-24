import express from "express";
import cors from 'cors'
import './config/db.js'
import userRouter from "./routes/userRouter.js";
import session from 'express-session'
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 3000;

const corsOptions = {
    origin : "https://reacthostingtest.vercel.app",
    methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://cmakareem:Cadd123@sample.kvxwkea.mongodb.net/sessions', // Replace with your MongoDB URI
        ttl: 14 * 24 * 60 * 60, // Time to live in seconds (14 days here)
      }),
      secret: 'yourSecretKey', // Replace with a strong secret
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set secure to true in production with HTTPS
    })
  );


app.use('/', userRouter)


app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}/`);
});
