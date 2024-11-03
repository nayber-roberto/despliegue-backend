const express = require("express");
const cors = require ('cors');
const dbconnect = require("./config");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();

const SECRET_KEY = "3aV19_!fKz23@Jkf83hZ1XyR56aP!7LMkqr98";

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { nomuser, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await ModelUser.findOne({ nomuser });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new ModelUser({ nomuser, password: hashedPassword });
        const savedUser = await newUser.save();
        
        res.status(201).json({ message: "Usuario registrado con éxito", user: savedUser });
    } catch (err) {
        res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    try {
        const { nomuser, password } = req.body;

        // Buscar el usuario en la base de datos
        const user = await ModelUser.findOne({ nomuser });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign({ id: user._id, nomuser: user.nomuser }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: "Autenticación satisfactoria", token });
    } catch (err) {
        res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
});



app.use(express.json());
app.use(cors({origin:'*'}));
app.use('/api/usuarios',require('./routes/usuario.routes'));
app.use('/api/empleados',require('./routes/empleado.routes'));
app.listen(3005, ()=> {
    console.log("El servidor está en el puerto 3005");
})

dbconnect();