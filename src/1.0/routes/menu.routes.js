const express = require("express");
const router = express.Router();
const upload = require('../../config/configMulter');
const menuController = require("../controllers/menu.controllers");

// Récupérer tous les menus
router.get('/', menuController.getAllMenus);
router.get('', menuController.getMenusParRestaurant);

// Créer un nouveau menu avec téléchargement d'image
router.post('/', upload.single('image'), menuController.createMenu);

// Mettre à jour un menu existant
router.patch('/:id',upload.single('image'), menuController.updateMenu);

// Supprimer un menu existant
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
