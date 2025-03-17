import express from 'express';
import PrescriptionService from '../services/PrescriptionService.js';
import multer from 'multer';
import process from 'process';
import path from 'path';

let router = express.Router();

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, "./MediApp/prescriptions/");
        },
        filename: function ( req, file, cb ) {
            cb(null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage });

router.post('/uploadPrescription/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    try {
        let prescription = await PrescriptionService.getPrescription(id);
        console.log(prescription);

        //dando erro, verificar
        // const file = "./MediApp/prescriptions/" + req.file.originalname;
        // console.log(file);
        // prescription = await PrescriptionService.updatePrescription(id, { file });
        
        return res.status(200).send(prescription);

    } catch (error) {
        res.status(500).send(error.message + ' - Error uploading file');
    }
});


//verificar se está funcionando
router.get('/readPrescription/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await PrescriptionService.getPrescription(id);
        let filePath = path.resolve(process.cwd() + "/../" + prescription.file);
        return res.status(200).sendFile(filePath);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


// ---------------------------- CRUD ---------------------------------------
router.get('/getAllPrescriptions', async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getPrescription/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await PrescriptionService.getPrescription(id);
        res.status(200).send(prescription);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/postPrescription', async (req, res) => {
    const prescription = req.body;
    try {
        const savedPrescription = await PrescriptionService.savePrescription(prescription);
        res.status(200).send(savedPrescription);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/prescriptions/:id', async (req, res) => {
    const { id } = req.params;
    const prescription = req.body;
    try {
        const updatedPrescription = await PrescriptionService.updatePrescription(id, prescription);
        res.status(200).send(updatedPrescription);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/prescriptions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await PrescriptionService.deletePrescription(id);
        res.status(200).send('Prescription deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ---------------------------- CRUD ---------------------------------------


router.get('/generatePrescription/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await PrescriptionService.getPrescription(id);
        const generatedPrescription = await PrescriptionService.generatePrescriptionFile(prescription);
        res.status(200).send(generatedPrescription);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;