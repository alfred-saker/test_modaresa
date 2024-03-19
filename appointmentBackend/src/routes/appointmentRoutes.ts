import { Router } from 'express';
import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointments,
    getAppointmentById,
    createBuyer,
    getBuyer,
    createSeller,
    getSeller} from '../controllers/appointmentController';

const router = Router();

router.get('/appointments', getAppointments);
router.get('/appointments/:id', getAppointmentById);
router.post('/appointments', createAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

router.post('/buyers', createBuyer);
router.get('/buyers', getBuyer);

router.post('/sellers', createSeller);
router.get('/sellers', getSeller);


export default router;

