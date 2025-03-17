import express from 'express';
import PacientService from '../services/PacientService.js';

let router = express.Router();

router.get('/pacients', async (req, res) => {
    try {
        const pacients = await PacientService.getAllPacients();
        res.status(200).send(pacients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getPacient/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pacient = await PacientService.getPacient(id);
        res.status(200).send(pacient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/postPacient', async (req, res) => {
    const {name, birthDate, email, phone } = req.body;
    try {
        await PacientService.savePacient({name, birthDate, email, phone});
        res.status(200).send('Pacient added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const {name, birthDate, email, phone } = req.body;
    try {
        await PacientService.updatePacient(id, {name, birthDate, email, phone});
        res.status(200).send('Pacient updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await PacientService.deletePacient(id);
        res.status(200).send('Pacient deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;