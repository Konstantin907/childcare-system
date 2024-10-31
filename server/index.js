import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import mongoose from 'mongoose';
import usersRoutes from './routes/users.route/users.route.js'
import parentRoutes from './routes/parents.route/parents.route.js'
import teacherRoutes from './routes/teacher.route/teacher.route.js'

dotenv.config({ path: '.env' })
const app = express();



const PORT = process.env.PORT || 3001;
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));

// mongo connection:
mongoose.connect(process.env.MONGO).
    then(() => {
      console.log('Connected to MongoDB');
  }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
  });
  



// enable json:
app.use(express.json());


app.use('/api/auth', usersRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/teacher', teacherRoutes);


app.listen(PORT,()=> {
    console.log('Server is listening at port' + ' ' + PORT); 
})