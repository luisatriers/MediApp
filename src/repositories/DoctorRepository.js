import Doctor from '../models/Doctor.js';

const getAllDoctors = async() => {
    return await Doctor.find();
}

const getDoctor = async(id) => {
    try {
        return await Doctor.findById(id);
    } catch (error) {
       throw new Error('Error while getting Doctor'); 
    }
}

const saveDoctor = async( {name, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    try {
        const doctor = new Doctor ( {name, login, password, medicalSpecialty, medicalRegistration, email, phone} );
        return await doctor.save();
    } catch (error) {
        throw new Error('Error while saving Doctor');
    }
}

const updateDoctor = async(id, {name, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    try {
        return await Doctor.findByIdAndUpdate(id, {name, login, password, medicalSpecialty, medicalRegistration, email, phone}, {new: true});
    } catch (error) {
        throw new Error('Error while updating Doctor');
    }
}

const deleteDoctor = async(id) => {
    try {
        return await Doctor.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error while deleting Doctor');
    }
}

//login
const getDoctorByLogin = async(login) => {
    try {
        return await Doctor.findOne({"login": login}); //procura uma única informação no banco
    } catch (error) {
        throw new Error('Error while getting Doctors login');
    }
}

const DoctorRepository = {
    getAllDoctors,
    getDoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorByLogin
}

export default DoctorRepository;