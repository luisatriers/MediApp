import express from 'express';
import AppointmentService from '../services/AppointmentService.js';


let router = express.Router();

router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.send(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getAppointment/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const appointment = await AppointmentService.getAppointment(id);
        res.send(appointment);
        console.log(appointment);
    } catch {
        res.status(500).send('Error while getting appointment');
    }
});

router.post('/postAppointment', async (req, res) => {
    try {
        const { date, doctorId, pacientId } = req.body;
        console.log(req.body);
        const appointment = await AppointmentService.saveAppointment( { date, doctorId, pacientId } );
        res.send(appointment);
    } catch {
        res.status(500).send(error);
    }

});

router.put('/appointments/:id', async (req, res) => {
    const {id} = req.params;
    const {date, doctorId, pacientId} = req.body;
    try {
        const appointment = await AppointmentService.updateAppointment(id, {date, doctorId, pacientId});
        res.send(appointment);
    } catch {
        res.status(500).send('Error while updating appointment');
    }
});

router.delete('/appointments/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const appointment = await AppointmentService.deleteAppointment(id);
        res.send(appointment);
    } catch {
        res.status(500).send('Error while deleting appointment');
    }
});

router.put('/reschedule/:id', async (req, res) => {
    const {id} = req.params;
    const {date} = req.body;
    try {
        let appointment = await AppointmentService.getAppointment(id);
        appointment.date = date;

        appointment = await AppointmentService.updateAppointment(id, {date});
        res.send(appointment);
        console.log("Appointment rescheduled");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;