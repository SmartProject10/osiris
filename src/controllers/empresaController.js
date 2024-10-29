const express = require('express');
const router = express.Router();
const empresaService = require('../services/empresaService');
const jwt = require('jsonwebtoken');
const empresaSchema = require('../model/empresaSchema.js');
const bcrypt = require('bcryptjs');
const { createAccessToken } = require('../lib/jwt.js');

// Ruta para verificar el token de autenticación de empresa
router.post('/authempresa/verify_token', async (req, res) => {
  
  const token = req.headers['authorization'] != undefined ? req.headers['authorization'] : req.headers['Authorization'];

  if (!token) return res.status(401).json({ message: "Unauthorized _1" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, empresa) => {
    if (err) return res.status(401).json({ message: "Unauthorized _2" });

    const empresaEncontrada = await empresaSchema.findById(empresa.payload.id);

    if (!empresaEncontrada) return res.status(401).json({ message: "Unauthorized _3" });

    return res.json({
      id: empresaEncontrada.id,
      email: empresaEncontrada.email,
      telefono: empresaEncontrada.telefono
    });
  })

});

router.post('/login', async (req, res) => {

  const { email, contraseña } = req.body;

  try {

    const empresaEncontrada = await empresaSchema.findOne({ email });

    if (!empresaEncontrada) return res.status(400).json({ message: "Empresa no encontrada" });

    const isMatch = await bcrypt.compare(contraseña, empresaEncontrada.contraseña);

    if (!isMatch) return res.status(400).json({ message: "Contraseña Incorrecta" });


    const token = await createAccessToken({ id: empresaEncontrada._id });

   // res.cookie('token', token)

    res.json({
      token: token,
      message: 'Empresa logueada correctamente',
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

);

// Ruta para crear una empresa
router.post('/', async (req, res) => {
  try {
    await empresaService.createEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Ruta para obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    await empresaService.getAllEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Ruta para obtener una empresa por ID
router.get('/:id', async (req, res) => {
  try {
    await empresaService.getEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Ruta para eliminar una empresa por ID
router.delete('/:id', async (req, res) => {
  try {
    await empresaService.deleteEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Ruta para obtener todas las áreas de una empresa por ID
router.get('/:id/getAllAreasEmpresa', async (req, res) => {
  try {
    await empresaService.getAllAreasEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});


module.exports = router;
