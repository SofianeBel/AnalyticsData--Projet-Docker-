/**
 * Routes pour les données de produits
 * Gère les endpoints liés aux opérations CRUD sur les produits
 */

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

/**
 * @route GET /api/products
 * @desc Récupère tous les produits
 */
router.get('/', productsController.getAllProducts);

/**
 * @route GET /api/products/by-category
 * @desc Récupère les produits groupés par catégorie
 */
router.get('/by-category', productsController.getProductsByCategory);

/**
 * @route GET /api/products/:id
 * @desc Récupère un produit spécifique par son ID
 */
router.get('/:id', productsController.getProductById);

module.exports = router; 