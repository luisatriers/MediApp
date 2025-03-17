import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Doctor name is required"]
        },
        login: {
            type: String,
            required: [true, "Login is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        medicalSpecialty: {
            type: String,
            required: [true, "Medical specialty is required"]
        },
        medicalRegistration: {
            type: String,
            required: [true, "Medical registration is required"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: function(v){
                    return /\d{2} 9\d{4}-\d{4}/.test(v); //regex for phone number
                },
                message: props => `${props.value} is not a valid phone number! Please use the format 99 91234-5678`
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
)

const doctor = mongoose.model('Doctor', doctorSchema);

export default doctor;