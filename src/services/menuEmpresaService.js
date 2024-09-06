const Menu = require('../model/menuEmpresaSchema');
const mongoose = require('mongoose');

const createMenu = async (req, res) => {
    const newMenu = new Menu(req.body);
        try {
            await newMenu.save();
            res.status(201).json({ message: 'Menu created successfully' });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
};

const getAllMenu = async (req, res) => {
    try {
      const Menus = await Menu.find();
      res.status(201).json(Menus);
    } catch (error) { 
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  module.exports = {
    createMenu,
    getAllMenu
  }