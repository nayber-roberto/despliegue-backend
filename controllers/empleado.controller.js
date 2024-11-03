const ModelEmpleado = require ('../models/empleado');

const empleadoCtrl = {};

//Create
empleadoCtrl.createEmpleado = async (req, res) => {
    const body = req.body;
    const respuesta = await ModelEmpleado.create(body);
    res.send(respuesta);
}

//Consultar
empleadoCtrl.getEmpleado = async (req, res) => {
    const respuesta = await ModelEmpleado.find({});
    res.send(respuesta);
}

//Consultar por ID
empleadoCtrl.getUniqueEmpleado = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelEmpleado.findById({_id:id});
    res.send(respuesta);
}

//Actualizar
empleadoCtrl.editEmpleado = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelEmpleado.findByIdAndUpdate({_id:id},body);
    res.send(respuesta);
}

//Eliminar
empleadoCtrl.deleteEmpleado = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelEmpleado.deleteOne({_id:id});
    res.send(respuesta);
}

module.exports = empleadoCtrl;