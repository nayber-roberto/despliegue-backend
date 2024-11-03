const ModelUser = require ('../models/model');

const usuarioCtrl = {};

//Create
usuarioCtrl.createUser = async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
}

//Consultar
usuarioCtrl.getUsers = async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta);
}

//Consultar por ID
usuarioCtrl.getUniqueUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById({_id:id});
    res.send(respuesta);
}

//Actualizar
usuarioCtrl.editUser = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findByIdAndUpdate({_id:id},body);
    res.send(respuesta);
}

//Eliminar
usuarioCtrl.deleteUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id:id});
    res.send(respuesta);
}

module.exports = usuarioCtrl;