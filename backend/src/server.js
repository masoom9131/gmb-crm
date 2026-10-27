const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req,res)=> res.json({status:'ok'}));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log('MongoDB Connected');
  app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err=> console.log('Mongo Error', err));