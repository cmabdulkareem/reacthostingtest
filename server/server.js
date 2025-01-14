import express from "express";
import cors from 'cors'
import './config/db.js'
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload'

const app = express();
const PORT = 3000;

const corsOptions = {
    origin : "https://reacthostingtest-gpz1.vercel.app",
    methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', true)
app.use(fileUpload())

app.use(express.static("public"))


app.use('/', userRouter)


app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}/`);
});
