const mongoose = require('mongoose');
const empleadoModel = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        position:{
            type: String,
            required: true
        },
        office:{
            type: String,
            required: true
        },
        salary:{
            type: Number,
            required: true
        }
    },
    {
        timestamps:true,
        versionKey:false,
    }
)

const ModelEmpleado = mongoose.model("empleados", empleadoModel);
module.exports = ModelEmpleado;