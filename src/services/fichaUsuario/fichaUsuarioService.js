const FichaUsuarios = require("../../model/fichaUsuario/fichaUsuarioSchema");
const DatosFamiliares = require("../../model/fichaUsuario/datosFamiliares");
const DatosContactos = require("../../model/fichaUsuario/datosContactos");
const { connectToMongoClient } = require("../../config/db");

const getFichaUsuario = async (req, res) => {
  const { email, id } = req.params;
  try {
    // conexión establecida
    const coll = await connectToMongoClient("persona");

    // Buscar usuario por email
    const usuario = await coll.findOne({ vEmail: email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const fichaUsuario = await FichaUsuarios.findOne({
      usuario: usuario._id,
      _id: id,
    })
      .populate("datoPersonales")
      .populate("datoLaborales");

    if (!fichaUsuario) {
      return res.status(404).json({
        message: "No se encontró la ficha de usuario para el usuario especificado",
      });
    }

    const [datosFamiliares, datosContactos] = await Promise.all([
      DatosFamiliares.find({ fichaUsuarioId: fichaUsuario._id }),
      DatosContactos.find({ fichaUsuarioId: fichaUsuario._id }),
    ]);

    const ficha = {
      fichaUsuario,
      datosFamiliares,
      datosContactos,
    };

    res.status(200).json(ficha);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la ficha de usuario",
      error: error.message,
    });
  }
};

module.exports = {
  getFichaUsuario,
};
