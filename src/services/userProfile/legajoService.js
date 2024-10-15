const UserProfiles = require("../../model/userProfile/userProfileSchema");
const Legajo = require("../../model/userProfile/legajoSchema");

const upsertLegajo = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { legajoIds, property, value } = req.body;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    let legajo;

    if (legajoIds) {
      // If an ID is provided, find the existing legajo
      legajo = await Legajo.findById(legajoIds);

      if (!legajo) {
        return res.status(404).json({ message: "Legajo not found" });
      }

      await legajo.saveProperty(property, value);
    } else {
      // Create a new legajo if no ID is provided
      legajo = new Legajo({ [property]: value });
      await legajo.save();

      userProfile.iLegajo = legajo._id;
      await userProfile.save();
    }

    res.status(200).json({
      profile: userProfile,
      legajo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteLegajo = async (req, res) => {
  const { iUserProfileId } = req.params;
  const { legajoIds, property } = req.body;

  try {
    // Find the user profile by ID
    const userProfile = await UserProfiles.findById(iUserProfileId);

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // If an ID is provided, find the existing legajo
    const legajo = await Legajo.findById(legajoIds);

    if (!legajo) {
      return res.status(404).json({ message: "Legajo not found" });
    }

    if (
      !legajo.vResume &&
      !legajo.vSkillCertificate &&
      !legajo.vIdentityDocument
    ) {
      await Legajo.findByIdAndDelete(legajo._id);

      userProfile.iLegajo = undefined;
      await userProfile.save();

      return res.status(200).json({
        message: "Legajo deleted as it was empty",
        profile: userProfile,
        legajo: null,
      });
    } else {
      await legajo.deleteProperty(property);
      return res.status(200).json({
        profile: userProfile,
        legajo,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  upsertLegajo,
  deleteLegajo,
};
