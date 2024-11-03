const express = require ('express');
const router = express.Router();
const empleadoCtrl = require ('../controllers/empleado.controller');

router.get('/', empleadoCtrl.getEmpleado);
router.post('/', empleadoCtrl.createEmpleado);
router.get('/:id', empleadoCtrl.getUniqueEmpleado);
router.put('/:id', empleadoCtrl.editEmpleado);
router.delete('/:id', empleadoCtrl.deleteEmpleado);

module.exports = router;