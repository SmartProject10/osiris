const FichaUsuarios = require("../../model/fichaUsuario/fichaUsuarioSchema");
const DatoPersonales = require("../../model/fichaUsuario/datoPersonales");
const { connectToMongoClient } = require("../../config/db");

const createDatoPersonales = async (req, res) => {
  const { usuarioEmail, ...data } = req.body;

  try {
    // conexión establecida
    const coll = await connectToMongoClient("persona");

     // Buscar usuarios por email
     const usuarios = await coll.find({ vEmail: { $in: usuarioEmail } }).toArray();

    if (usuarios.length === 0) {
      return res.status(404).json({ message: "Usuarios no encontrados" });
    }

    const nuevosDatoPersonales = new DatoPersonales(data);
    await nuevosDatoPersonales.save();

    // Crear un array de objetos con los IDs de los usuarios
    const usuariosArray = usuarios.map((usuario) => ({ _id: usuario._id }));

    // Crear una nueva ficha de usuario con los datos personales
    const nuevaFichaDeUsuario = new FichaUsuarios({
      usuario: usuariosArray,
      datoPersonales: nuevosDatoPersonales._id,
    });

    // Guardar la nueva ficha de usuario
    await nuevaFichaDeUsuario.save();
    res.status(201).json({
      ficha: nuevaFichaDeUsuario,
      datoPersonales: nuevosDatoPersonales,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

const updateDatoPersonales = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;
  const { usuarioEmail, ...data } = req.body;

  try {
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);
    if (!fichaUsuario) {
      return res
        .status(404)
        .json({ message: "Ficha de usuario no encontrada" });
    }

    // conexión establecida
    const coll = await connectToMongoClient("persona");

    // Buscar usuarios por email
    const usuarios = await coll
      .find({ vEmail: { $in: usuarioEmail } })
      .toArray();

    if (usuarios.length === 0) {
      return res.status(404).json({ message: "Usuarios no encontrados" });
    }

    // Actualizar los datos personales existentes
    const updatedDatoPersonales = await DatoPersonales.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedDatoPersonales) {
      return res
        .status(404)
        .json({ message: "Datos personales no encontrados" });
    }

    // Crear un array de objetos con los IDs de los usuarios
    const usuariosArray = usuarios.map((usuario) => ({
      _id: usuario._id,
    }));

    // Actualizar la ficha de usuario con los datos personales actualizados
    const updatedFichaDeUsuario = await FichaUsuarios.findByIdAndUpdate(
      fichaUsuarioId,
      { usuario: usuariosArray, datoPersonales: updatedDatoPersonales._id },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      ficha: updatedFichaDeUsuario,
      datoPersonales: updatedDatoPersonales,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = {
  createDatoPersonales,
  updateDatoPersonales,
};
