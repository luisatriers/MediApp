import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const pacientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Doctor name is required"]
        },
        birthDate: {
            type: Date,
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

const pacient = mongoose.model('Pacient', pacientSchema);

export default pacient;