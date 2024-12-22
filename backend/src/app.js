import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import videoConferenceRoutes from './routes/videoConferenceRoutes.js';
import dashRoutes from './routes/dashRoutes.js';


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
app.use("/api/projects", projectRoutes);
app.use("/api/video-conference", videoConferenceRoutes);

//routes import

//routes declaration


export default app;