import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import ringRoutes from "./routes/ringRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/rings", ringRoutes);

mongoose
  .connect(
    "mongodb+srv://evandrocaladodasilva:RP3wiex3QMaaoh5Z@cluster0.ijv2o.mongodb.net/rings?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
