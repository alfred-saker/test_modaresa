import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointmentRoutes'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
