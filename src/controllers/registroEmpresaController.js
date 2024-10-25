const express = require('express');
const router = express.Router();
const registroEmpresaService = require('../services/registroEmpresaService');
const { createAccessToken } = require('../lib/jwt.js');
const jwt = require('jsonwebtoken');
const registroEmpresa = require('../model/registroEmpresaSchema');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    await registroEmpresaService.createEmpresa(req, res);
  
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await registroEmpresaService.getAllEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await registroEmpresaService.getEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await registroEmpresaService.deleteEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

 router.post('/authempresa/verify_token', async (req, res) => {

  const token = req.headers['authorization'] != undefined ? req.headers['authorization'] : req.headers['Authorization'];

  if (!token) return res.status(401).json({ message: "Unauthorized _1" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, empresa) => {
    if (err) return res.status(401).json({ message: "Unauthorized _2" });

    const empresaEncontrada = await registroEmpresa.findById(empresa.payload.id);

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

    const empresaEncontrada = await registroEmpresa.findOne({ email });

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


module.exports = router;
