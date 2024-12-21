import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';


const app = express();

app.use(cors({
    origin: 3000,
    credentials: true
})); 

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

//routes import

//routes declaration


export default app;