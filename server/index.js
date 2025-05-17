
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import AllRoutes from './routes/index.js'

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(morgan('combined'));
app.use(cors({
  credentials:true,
  origin :"http://localhost:3007"

}));
app.use(express.json());


app.use("/api/v1", AllRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Error connecting to db : ", error);
  });

app.listen(process.env.PORT_NUMBER || 7000, () => {
  console.log(`server is running on port ${process.env.PORT_NUMBER}`);
});