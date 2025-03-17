import Prescription from '../models/Prescription.js';

const getAllPrescriptions = async () => {
    return await Prescription.find();
}

const getPrescription = async (id) => {
    try {
        return await Prescription.findById(id);
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting prescription');
    }
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    try {
        const prescription = new Prescription({ date, appointmentId, medicine, dosage, instructions });
        return await prescription.save();
    } catch (error) {
        console.log(error);
        throw new Error('Error while saving prescription');
    }
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions, file }) => {
    try {
        return await Prescription.findByIdAndUpdate(id, { date, appointmentId, medicine, dosage, instructions, file }, { new: true });
    } catch (error) {
        console.log(error);
        throw new Error('Error while updating prescription');
    }   
}

const deletePrescription = async (id) => {
    try {
        return await Prescription.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error('Error while deleting prescription');
    }   
}

const PrescriptionRepository = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription,
}

export default PrescriptionRepository;