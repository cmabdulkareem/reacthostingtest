import express from "express";
import cors from 'cors'
import './config/db.js'
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 3000;

const corsOptions = {
    origin : "http://localhost:5173",
    methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


app.use('/', userRouter)


app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}/`);
});
