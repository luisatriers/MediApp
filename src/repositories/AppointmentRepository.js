import Appointment from '../models/Appointment.js';

const getAllAppointments = async () =>  {
    return await Appointment.find();
}

const getAppointment = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw new Error('Error while getting appointment');
    }
}

const saveAppointment = async ({ date, doctorId, pacientId }) => {
    try {
        const appointment = new Appointment( {date, doctorId, pacientId} );
        return await appointment.save();
    } catch (error) {
        throw new Error('Error while saving appointment - Repository');
    }
}

const updateAppointment = async (id, {date, doctorId, pacientId}) =>  {
    try {
        return await Appointment.findByIdAndUpdate(id, { date, doctorId, pacientId }, {new: true});
    } catch (error) {
        throw new Error('Error while updating appointment');
    }
}

const deleteAppointment = async (id) => {
    try {
        return await Appointment.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error while deleting appointment');
    }
}

const AppointmentRepository = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default AppointmentRepository;