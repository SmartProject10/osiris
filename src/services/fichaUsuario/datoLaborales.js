const FichaUsuarios = require("../../model/fichaUsuario/fichaUsuarioSchema");
const DatoLaborales = require("../../model/fichaUsuario/datoLaborales");
const { connectToMongoClient } = require("../../config/db");
const { ObjectId } = require("mongodb");

const createDatoLaborales = async (req, res) => {
  const { fichaUsuarioId } = req.params;
  const { empresaIds, ...data } = req.body;

  try {
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);
    if (!fichaUsuario) {
      return res
        .status(404)
        .json({ message: "Ficha de usuario no encontrada" });
    }

    // conexión establecida
    const coll = await connectToMongoClient("company");

    // Convertir los IDs a ObjectId usando createFromTime
    const empresaObjectIds = empresaIds.map((id) => new ObjectId(`${id}`));

    // Buscar empresas por id
    const empresas = await coll
      .find({ _id: { $in: empresaObjectIds } })
      .toArray();

    if (empresas.length === 0) {
      return res.status(404).json({ message: "Empresas no encontradas" });
    }

    const nuevaDatoLaborales = new DatoLaborales(data);
    await nuevaDatoLaborales.save();

    const empresaArray = empresaObjectIds.map((id) => ({ _id: id }));

    // Actualizar la ficha de usuario con las nuevas empresas y datos laborales
    const updatedFichaUsuario = await FichaUsuarios.findByIdAndUpdate(
      fichaUsuarioId,
      { empresa: empresaArray, datoLaborales: nuevaDatoLaborales._id },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      ficha: updatedFichaUsuario,
      datoLaborales: nuevaDatoLaborales,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

const updateDatoLaborales = async (req, res) => {
  const { fichaUsuarioId, id } = req.params;
  const { empresaIds, ...data } = req.body;

  try {
    const fichaUsuario = await FichaUsuarios.findById(fichaUsuarioId);
    if (!fichaUsuario) {
      return res.status(404).json({ message: "Ficha de usuario no encontrada" });
    }

    // conexión establecida
    const coll = await connectToMongoClient("company");
    
    // Convertir los IDs a ObjectId
    const empresaObjectIds = empresaIds.map((id) => new ObjectId(`${id}`));

    // Buscar empresas por id
    const empresas = await coll.find({ _id: { $in: empresaObjectIds } }).toArray();

    if (empresas.length === 0) {
      return res.status(404).json({ message: "Empresas no encontradas" });
    }

    // Actualizar los datos laborales existentes
    const updatedDatoLaborales = await DatoLaborales.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedDatoLaborales) {
      return res.status(404).json({ message: "Datos laborales no encontrados" });
    }

    const empresaArray = empresaIds.map((id) => ({ _id: id }));

    // Actualizar la ficha de usuario con las nuevas empresas y datos laborales
    const updatedFichaUsuario = await FichaUsuarios.findByIdAndUpdate(
      fichaUsuarioId,
      { empresa: empresaArray, datoLaborales: updatedDatoLaborales._id },
      { new: true, runValidators: true }
    );

    if (!updatedFichaUsuario) {
      return res.status(404).json({ message: "No se pudo actualizar la ficha de usuario" });
    }

    res.status(200).json({
      ficha: updatedFichaUsuario,
      datoLaborales: updatedDatoLaborales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};


module.exports = {
  createDatoLaborales,
  updateDatoLaborales,
};
