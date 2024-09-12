const Iso = require("../model/isoSchema");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const createIso = async (req, res) => {
  const newISO = new Iso(req.body);
  try {
    const result = await newISO.save();
    console.log(`New iso inserted with ID: ${result._id}`);
    res.status(201).json({ message: "ISO created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIsoById = async (req, res) => {
  try {
    const isoId = req.params.id;
    const filter = { _id: new ObjectId(isoId) };
    const iso = await Iso.findOne(filter);

    if (!iso) {
      return res.status(404).json({ message: "Iso not found" });
    }

    res.status(200).json(iso);
  } catch (error) {
    console.error("Error fetching iso:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllIsos = async (req, res) => {
  try {
    const data = await Iso.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al realizar la búsqueda",
    });
  }
};

const updateIso = async (req, res) => {
  try {
    const isoId = req.params._id;
    const updatedIso = req.body;
    // const filter = { _id: new ObjectId(isoId) };
    await Iso.findByIdAndUpdate(
      isoId,
      updatedIso,
      { new: true }
    );
    res.status(200).json({ message: "Iso updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteIso = async (req, res) => {
  const client = await MongoClient.connect(process.env.URI);
  try {
    await client.connect();
    const db = client.db("isoDb");
    const isos = db.collection("iso");
    const isoId = req.params.id;
    const filter = { _id: new ObjectId(isoId) };
    await isos.findOneAndDelete(filter);
    res.status(200).json({ message: "Iso deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIso,
  getIsoById,
  getAllIsos,
  updateIso,
  deleteIso,
};
