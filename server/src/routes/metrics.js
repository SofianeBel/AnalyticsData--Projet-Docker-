/**
 * Routes pour les métriques de performance
 * Gère les endpoints liés aux métriques et KPIs
 */

const express = require('express');
const metricsController = require('../controllers/metrics');

const router = express.Router();

/**
 * @route GET /api/metrics
 * @desc Récupère toutes les métriques de performance
 */
router.get('/', metricsController.getAllMetrics);

/**
 * @route GET /api/metrics/by-name/:name
 * @desc Récupère les métriques par nom
 */
router.get('/by-name/:name', metricsController.getMetricsByName);

/**
 * @route GET /api/metrics/trend/:name
 * @desc Récupère la tendance d'une métrique spécifique
 */
router.get('/trend/:name', metricsController.getMetricTrend);

module.exports = router; 