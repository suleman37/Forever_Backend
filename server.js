import express from 'express';
import cors from 'cors';
import "dotenv/config";
import ConnectDB from './config/mongo.js';
import ConnectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoute.js';

const app = express();
const port = process.env.PORT;
ConnectDB();
ConnectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
 
app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});