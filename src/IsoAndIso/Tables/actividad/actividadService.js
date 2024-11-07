const ActividadSchema = require('./actividadSchema');

const createActivity = async (req) => {
  const activity = new ActividadSchema(req.body);
  await activity.save();
  return activity;
};

const getAllActivities = async () => {
    const activities = await ActividadSchema.find();
    return activities;
};

const getActivityById = async (req) => {
  const actividadId = req.params.id;
  const activity = await ActividadSchema.findById(actividadId);
  return activity;
};

const deleteActivityById = async (req) => {
  const activityId = req.params.id;
  await ActividadSchema.findByIdAndDelete(activityId);
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  deleteActivityById
};
