import express from 'express';
import AppointmentController from './AppointmentController.js';
import DoctorController from './DoctorController.js';
import PacientController from './PacientController.js';
import PrescriptionController from './PrescriptionController.js';
import DoctorService from '../services/DoctorService.js';
import bcrypt from 'bcrypt';
import verifyToken from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.get('/', function (req, res) {
    console.log('Hello World!');
    res.status(200).json({ message: 'hi!'});
});

// mapeamento do login
router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body;
        const doctor = await DoctorService.getDoctorByLogin(login);
        if (!doctor) {
            res.status(404).json({error: 'Doctor not found'});
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            res.status(403).json({error: 'Invalid password'});
        }

        const token = jwt.sign({doctorId: doctor._id}, 'your-secret-key', {expiresIn: '1h'});
        res.status(200).json({token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Login failed!'});
    }
});

// -------- configuração de rotas com autenticação --------
// router.use('/', verifyToken, AppointmentController);
// router.use('/', verifyToken, DoctorController);
// router.use('/', verifyToken, PacientController);
// router.use('/', verifyToken, PrescriptionController);

// -------- configuração de rotas sem autenticação --------
router.use('/', AppointmentController);
router.use('/', DoctorController);
router.use('/',  PacientController);
router.use('/', PrescriptionController);

export default router;