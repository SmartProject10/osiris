const DatosContactos = require('../../model/fichaUsuario/datosContactos');
const { connectToMongoClient } = require('../../config/db');

const createDatosContactos = async (req, res) => {
  const { email } = req.params;
  const data = req.body;
  try {
    const client = await connectToMongoClient();
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Validar datos
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send('Datos de contacto no proporcionados');
      }
      // Asignar el userId al nuevo objeto de datos de contacto
      data.userId = usuario._id;

      // Crear una nueva ficha de usuario con los datos adicionales
      const nuevaFichaUsuario = new DatosContactos(data);

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

const updateDatosContactos = async (req, res) => {
  const { email, id } = req.params;
  const data = req.body;

  try {
    const client = await connectToMongoClient();
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Buscar los datos de contacto existentes por userId y id
      const datosContactos = await DatosContactos.findOne({
        userId: usuario._id,
        _id: id,
      });

      if (datosContactos) {
        // Actualizar los datos de contacto con la nueva información
        Object.assign(datosContactos, data);

        // Guardar los cambios
        await datosContactos.save();
        res.status(200).send(datosContactos);
      } else {
        res.status(404).send('Datos de contacto no encontrados');
      }
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

const listDatosContactos = async (req, res) => {
  const { email } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const client = await connectToMongoClient();
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;

      // Obtener los datos de contacto con paginación
      const datosContactos = await DatosContactos.find({
        userId: usuario._id,
      })
        .skip(skip)
        .limit(parseInt(limit));

      // Contar el total de documentos
      const total = await DatosContactos.countDocuments({
        userId: usuario._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: datosContactos,
      });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

const getDatoContacto = async (req, res) => {
  const { email, id } = req.params;

  try {
    const client = await connectToMongoClient();
    const coll = client.db('isoDb').collection('user');
    // Buscar usuario por email
    const usuario = await coll.findOne({ email });

    if (usuario) {
      // Buscar el dato de contacto específico por userId y el id del dato de contacto
      const datoContacto = await DatosContactos.findOne({
        userId: usuario._id,
        _id: id,
      });

      if (datoContacto) {
        res.status(200).send(datoContacto);
      } else {
        res.status(404).send('Dato de contacto no encontrado');
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
  createDatosContactos,
  updateDatosContactos,
  listDatosContactos,
  getDatoContacto,
};
