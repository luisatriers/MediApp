import Pacient from '../models/Pacient.js';

const getAllPacients = async () =>  {
    try {
        return await Pacient.find();
    } catch (error) {
        throw new Error(error.message);
    }
    
}

const getPacient = async (id) => {
    try {
        return await Pacient.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

const savePacient = async ({name, birthDate, email, phone}) => {
    try {
        const pacient = new Pacient({name, birthDate, email, phone});
        return await pacient.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePacient = async (id, {name, birthDate, email, phone}) => {
    try {
        return await Pacient.findByIdAndUpdate(id, {name, birthDate, email, phone}, {new: true});
    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePacient = async (id) => {
    try {
        return await Pacient.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

const PacientRepository = {
    getAllPacients,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default PacientRepository;