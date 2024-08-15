const DatosContactos = require("../../model/fichaUsuario/datosContactos");
const FichaUsuarios = require("../../model/fichaUsuario/fichaUsuarioSchema");

const createDatosContactos = async (req, res) => {
  const { fichaUsuarioId } = req.params;
  const data = req.body;
  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Validar datos
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Datos de contacto no proporcionados");
      }
      // Asignar el fichaUsuarioId al nuevo objeto de datos de contacto
      data.fichaUsuarioId = fichaUsuario._id;

      // Crear una nueva entrada de datos de contacto
      const nuevosDatosContactos = new DatosContactos(data);

      // Guardar los nuevos datos de contacto
      await nuevosDatosContactos.save();
      res.status(200).send(nuevosDatosContactos);
    } else {
      res.status(404).send("Ficha de usuario no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const updateDatosContactos = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;
  const data = req.body;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Buscar los datos de contacto existentes por userId y id
      const datosContactos = await DatosContactos.findById(id);

      if (datosContactos) {
        // Actualizar los datos de contacto con la nueva información
        Object.assign(datosContactos, data);

        // Guardar los cambios
        await datosContactos.save();
        res.status(200).send(datosContactos);
      } else {
        res.status(404).send("Datos de contacto no encontrados");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const listDatosContactos = async (req, res) => {
  const { fichaUsuarioId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "direccionActualizada",
    order = "asc",
  } = req.query;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;

      // Obtener los datos de contacto con paginación y ordenación
      const datosContactos = await DatosContactos.find({
        fichaUsuarioId: fichaUsuario._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Contar el total de documentos
      const total = await DatosContactos.countDocuments({
        fichaUsuarioId: fichaUsuario._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: datosContactos,
      });
    } else {
      res.status(404).send("Ficha de usuario no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const getDatoContacto = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Buscar los datos de contacto existentes por userId y id
      const datoContacto = await DatosContactos.findById(id);

      if (datoContacto) {
        res.status(200).send(datoContacto);
      } else {
        res.status(404).send("Dato de contacto no encontrado");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  createDatosContactos,
  updateDatosContactos,
  listDatosContactos,
  getDatoContacto,
};
