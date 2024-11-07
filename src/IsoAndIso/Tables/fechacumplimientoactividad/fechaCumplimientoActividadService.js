const fechaCumplimientoActividadSchema = require('./fechaCumplimientoActividadSchema');

const createActivityComplianceDate = async (req) => {
  const fechaCumplimientoActividad = new fechaCumplimientoActividadSchema(req.body);
  await fechaCumplimientoActividad.save();
  return fechaCumplimientoActividad;
};

const getAllActivitiesComplianceDate = async () => {
    const fechaCumplimientoActividad = await fechaCumplimientoActividadSchema.find();
    return fechaCumplimientoActividad;
};

const getActivityComplianceDateById = async (req) => {
  const fechaCumplimientoActividadId = req.params.id;
  const fechaCumplimientoActividad = await fechaCumplimientoActividadSchema.findById(fechaCumplimientoActividadId);
  return fechaCumplimientoActividad;
};

const deleteActivityComplianceDateById = async (req) => {
  const fechaCumplimientoActividadId = req.params.id;
  await fechaCumplimientoActividadSchema.findByIdAndDelete(fechaCumplimientoActividadId);
};

module.exports = {
  createActivityComplianceDate,
  getAllActivitiesComplianceDate,
  getActivityComplianceDateById,
  deleteActivityComplianceDateById
};
