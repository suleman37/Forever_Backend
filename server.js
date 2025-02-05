import express from 'express';
import cors from 'cors';
import "dotenv/config";
import ConnectDB from './config/mongo.js';

const app = express();
const port = process.env.PORT;
ConnectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});