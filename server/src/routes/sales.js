/**
 * Routes pour les données de ventes
 * Gère les endpoints liés aux opérations CRUD sur les ventes
 */

const express = require('express');
const salesController = require('../controllers/sales');

const router = express.Router();

/**
 * @route GET /api/sales
 * @desc Récupère toutes les ventes avec pagination et filtres
 */
router.get('/', salesController.getAllSales);

/**
 * @route GET /api/sales/by-region
 * @desc Récupère les ventes groupées par région
 */
router.get('/by-region', salesController.getSalesByRegion);

/**
 * @route GET /api/sales/by-product
 * @desc Récupère les ventes groupées par produit
 */
router.get('/by-product', salesController.getSalesByProduct);

/**
 * @route GET /api/sales/by-date
 * @desc Récupère les ventes groupées par date
 */
router.get('/by-date', salesController.getSalesByDate);

/**
 * @route GET /api/sales/:id
 * @desc Récupère une vente spécifique par son ID
 */
router.get('/:id', salesController.getSaleById);

module.exports = router; 