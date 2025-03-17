import { mongoose }  from 'mongoose';
import doctor from './Doctor.js';
import pacient from './Pacient.js';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        date: {
            type: Date,
            required: [true, "Appointment date is required"]
        },
        doctorId: {
            type: String,
            required: [true, "Doctor Id is required"],
            validade: {
                validator: function(v){
                    const id = new mongoose.Types.ObjectId(v); //convertendo uma string em um ObjectId para ser encontrado no banco
                    return doctor.exists({_id: id});
                },
                message: props => `DoctorID ${props.value} not found.`
            }
        },
        pacientId: {
            type: String,
            required: [true, "Pacient Id is required"],
            validade: {
                validator: function(v){
                    const id = new mongoose.Types.ObjectId(v); //convertendo uma string em um ObjectId para ser encontrado no banco
                    return pacient.exists({_id: id});
                },
                message: props => `PacientID ${props.value} not found.`
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
)

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;