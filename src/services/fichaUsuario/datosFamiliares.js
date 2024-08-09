const DatosFamiliares = require('../../model/fichaUsuario/datosFamiliares');
const { connectToMongoClient } = require('../../config/db');

const createDatosFamiliares = async (req, res) => {
  const { email } = req.params;
  const data = req.body;
  try {

    const client = await connectToMongoClient()
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Validar datos
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send('Datos familiares no proporcionados');
      }
      // Asignar el userId al nuevo objeto de datos familiares
      data.userId = usuario._id;

      // Crear una nueva ficha de usuario con los datos adicionales
      const nuevaFichaUsuario = new DatosFamiliares(data);

      // Guardar la nueva ficha de usuario
      await nuevaFichaUsuario.save();
      res.status(200).send(nuevaFichaUsuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

const updateDatosFamiliares = async (req, res) => {
  const { email, id } = req.params;
  const data = req.body;

  try {
    const client = await connectToMongoClient()
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Buscar los datos familiares existentes por userId y id
      const datosFamiliares = await DatosFamiliares.findOne({
        userId: usuario._id,
        _id: id,
      });

      if (datosFamiliares) {
        // Actualizar los datos familiares con la nueva información
        Object.assign(datosFamiliares, data);

        // Guardar los cambios
        await datosFamiliares.save();
        res.status(200).send(datosFamiliares);
      } else {
        res.status(404).send('Datos familiares no encontrados');
      }
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

const listDatosFamiliares = async (req, res) => {
  const { email } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const client = await connectToMongoClient()
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;

      // Obtener los datos familiares con paginación
      const datosFamiliares = await DatosFamiliares.find({
        userId: usuario._id,
      })
        .skip(skip)
        .limit(parseInt(limit));

      // Contar el total de documentos
      const total = await DatosFamiliares.countDocuments({
        userId: usuario._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: datosFamiliares,
      });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

const getDatoFamiliar = async (req, res) => {
  const { email, id } = req.params;

  try {
    const client = await connectToMongoClient()
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Buscar el dato familiar específico por userId y el id del dato familiar
      const datoFamiliar = await DatosFamiliares.findOne({
        userId: usuario._id,
        _id: id,
      });

      if (datoFamiliar) {
        res.status(200).send(datoFamiliar);
      } else {
        res.status(404).send('Dato familiar no encontrado');
      }
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

module.exports = {
  createDatosFamiliares,
  updateDatosFamiliares,
  listDatosFamiliares,
  getDatoFamiliar,
};
