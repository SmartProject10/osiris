const DatosFamiliares = require("../../model/fichaUsuario/datosFamiliares");
const FichaUsuarios = require("../../model/fichaUsuario/fichaUsuarioSchema");

const createDatosFamiliares = async (req, res) => {
  const { fichaUsuarioId } = req.params;
  const data = req.body;
  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Validar datos
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Datos familiares no proporcionados");
      }
      // Asignar el fichaUsuarioId al nuevo objeto de datos familiares
      data.fichaUsuarioId = fichaUsuario._id;

      // Crear una nueva entrada de datos familiares
      const nuevosDatosFamiliares = new DatosFamiliares(data);

      // Guardar los nuevos datos familiares
      await nuevosDatosFamiliares.save();
      res.status(200).send(nuevosDatosFamiliares);
    } else {
      res.status(404).send("Ficha de usuario no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const updateDatosFamiliares = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;
  const data = req.body;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Buscar los datos familiares existentes por userId y id
      const datosFamiliares = await DatosFamiliares.findById(id);

      if (datosFamiliares) {
        // Actualizar los datos familiares con la nueva información
        Object.assign(datosFamiliares, data);

        // Guardar los cambios
        await datosFamiliares.save();
        res.status(200).send(datosFamiliares);
      } else {
        res.status(404).send("Datos familiares no encontrados");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const listDatosFamiliares = async (req, res) => {
  const { fichaUsuarioId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "nombreCompleto",
    order = "asc",
  } = req.query;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;

      // Obtener los datos familiares con paginación y ordenación
      const datosFamiliares = await DatosFamiliares.find({
        fichaUsuarioId: fichaUsuario._id,
      })
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit));

      // Contar el total de documentos
      const total = await DatosFamiliares.countDocuments({
        fichaUsuarioId: fichaUsuario._id,
      });

      res.status(200).send({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: datosFamiliares,
      });
    } else {
      res.status(404).send("Ficha de usuario no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const getDatoFamiliar = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Buscar los datos familiares existentes por userId y id
      const datoFamiliar = await DatosFamiliares.findById(id);

      if (datoFamiliar) {
        res.status(200).send(datoFamiliar);
      } else {
        res.status(404).send("Dato familiar no encontrado");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

const deleteDatosFamiliares = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;

  try {
    // Buscar ficha de usuario por ID
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);

    if (fichaUsuario) {
      // Buscar los datos familiares existentes por userId y id
      const datosFamiliares = await DatosFamiliares.findByIdAndDelete(id);

      if (datosFamiliares) {
        res.status(200).send("Datos familiares eliminados exitosamente");
      } else {
        res.status(404).send("Datos familiares no encontrados");
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
  createDatosFamiliares,
  updateDatosFamiliares,
  listDatosFamiliares,
  getDatoFamiliar,
  deleteDatosFamiliares,
};
