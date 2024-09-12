const Trabajador = require('../model/trabajadorSchema');

const createTrabajador = async (data) => {
  const newTrabajador = new Trabajador(data);
  return await newTrabajador.save();
};

const getTrabajadorById = async (id) => {
  return await Trabajador.findById(id);
};

const getAllTrabajadores = async (filtros, page = 1, limit = 10) => {
  const query = {};

  // Verificamos si cada filtro está definido y agregamos al query
  if (filtros.area) query.area = filtros.area;
  if (filtros.cargo) query.cargo = filtros.cargo;
  if (filtros.dni) query.dni = filtros.dni;
  if (filtros.apellidoPaterno) query.apellidoPaterno = filtros.apellidoPaterno;
  if (filtros.apellidoMaterno) query.apellidoMaterno = filtros.apellidoMaterno;
  if (filtros.estadoCivil) query.estadoCivil = filtros.estadoCivil;
  if (filtros.genero) query.genero = filtros.genero;
  if (filtros.nacionalidad) query.nacionalidad = filtros.nacionalidad;
  if (filtros.distrito) query.distrito = filtros.distrito;
  if (filtros.direccion) query.direccion = filtros.direccion;
  if (filtros.status) query.status = filtros.status;

  // Calcular el salto de documentos para la paginación
  const skip = (page - 1) * limit;

  // Ejecutar la consulta con filtros y paginación
  const trabajadores = await Trabajador.find(query)
    .skip(skip)
    .limit(limit);

  // Obtener el total de documentos que coinciden con los filtros
  const totalTrabajadores = await Trabajador.countDocuments(query);

  return {
    trabajadores,
    totalPages: Math.ceil(totalTrabajadores / limit),
    currentPage: page,
  };
};

const updateTrabajador = async (id, data) => {
  return await Trabajador.findByIdAndUpdate(id, data, { new: true });
};

const deleteTrabajador = async (id) => {
  return await Trabajador.findByIdAndDelete(id);
};

module.exports = {
  createTrabajador,
  getTrabajadorById,
  getAllTrabajadores,
  updateTrabajador,
  deleteTrabajador
};
