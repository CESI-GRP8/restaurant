const fs = require('fs');
const path = require('path');
const Menu = require('../models/menu.models');
const upload = require('../../config/configMulter');

// Récupérer tous les menus
exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersParRestaurant = async (req, res) => {
    const restaurantNom = req.params.restaurantNom;
    try {
        const menus = await Menu.find({ nomRestaurant: restaurantNom });
        return res.status(200).json(menus);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};
// Créer un nouveau menu
exports.createMenu = async (req, res) => {
    // Vérifier si une image est téléchargé
        
        const menu = new Menu({
            name: req.body.name,
            nomRestaurant: req.body.name,
            description: req.body.description,
            crudites: req.body.crudites,
            sauces: req.body.sauces,
            boissons: req.body.boissons,
            prix: req.body.prix,
            image: req.file ? req.file.path : null // Enregistrer le chemin de l'image si elle est téléchargée
        });
    
        try {
            const newMenu = await menu.save();
            res.status(201).json(newMenu);
        } catch (error) {
            // Supprimer le fichier téléchargé en cas d'erreur
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: error.message });
        }
};

// Mettre à jour un menu existant
exports.updateMenu = async (req, res) => {
    // Vérifier si une image est téléchargée
        try {
            const menu = await Menu.findById(req.params.id);

            // Vérifie si le menu existe
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }

            // Mettre à jour le chemin de l'image si une nouvelle image est téléchargée
            if (req.file) {
                //console.log("rentré dans if 1")
                const newImagePath = req.file.path;
                // Supprimer l'ancienne image si elle existe
                if (menu.image) {
                    fs.unlinkSync(menu.image);
                }
                menu.image = newImagePath;
            }

            // Ajouter des éléments aux listes si les données sont fournies dans la requête
			if (req.body.addCrudites) {
				menu.crudites.push(req.body.addCrudites);
			}
			if (req.body.addSauces) {
				menu.sauces.push(req.body.addSauces);
			}
			if (req.body.addBoissons) {
				menu.boissons.push(req.body.addBoissons);
			}

			// Supprimer des éléments des listes si les données sont fournies dans la requête
			if (req.body.removeCrudites) {
				menu.crudites.pull(req.body.removeCrudite);
			}
			if (req.body.removeSauces) {
				menu.sauces.pull(req.body.removeSauces);
			}
			if (req.body.removeBoissons) {
				menu.boissons.pull(req.body.removeBoissons);
			}

			// Mettre à jour d'autres champs si nécessaire
			if (req.body.name) {
				menu.name = req.body.name;
			}
            if (req.body.nomRestaurant) {
				menu.nomRestaurant = req.body.nomRestaurant;
			}
			if (req.body.description) {
				menu.description = req.body.description;
			}
			if (req.body.prix) {
				menu.prix = req.body.prix;
        }
            
            // Enregistrer les modifications
            const updatedMenu = await menu.save();
            
            res.json(updatedMenu);
        } catch (error) {
            // Supprimer le fichier téléchargé en cas d'erreur
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: error.message });
        }
};

// Supprimer un menu existant
exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findOneAndDelete({ _id: req.params.id });
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        // Supprimer l'image associée au menu si elle existe
        if (menu.image) {
            fs.unlinkSync(menu.image);
        }

        res.json({ message: 'Menu deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
