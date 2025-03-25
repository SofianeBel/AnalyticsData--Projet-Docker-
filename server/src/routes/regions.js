/**
 * Routes pour les données de régions
 * Gère les endpoints liés aux opérations CRUD sur les régions
 */

const express = require('express');
const regionsController = require('../controllers/regions');

const router = express.Router();

/**
 * @route GET /api/regions
 * @desc Récupère toutes les régions
 */
router.get('/', regionsController.getAllRegions);

/**
 * @route GET /api/regions/:id
 * @desc Récupère une région spécifique par son ID
 */
router.get('/:id', regionsController.getRegionById);

module.exports = router; 