const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu.controllers");

// Récupérer tous les menus
router.get('/', menuController.getAllMenus);

// Créer un nouveau menu
router.post('/', menuController.createMenu);

// Mettre à jour un menu existant
router.patch('/:id', menuController.updateMenu);

// Supprimer un menu existant
router.delete('/:id', menuController.deleteMenu);

module.exports = router;