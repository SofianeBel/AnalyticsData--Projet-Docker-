/**
 * Contrôleur pour la gestion des métriques de performance
 * Contient la logique métier pour les opérations sur les métriques
 */

const db = require('../config/db');

/**
 * Récupère toutes les métriques de performance
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getAllMetrics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = 'SELECT * FROM performance_metrics';
    const params = [];
    
    if (startDate && endDate) {
      query += ' WHERE date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    } else if (startDate) {
      query += ' WHERE date >= $1';
      params.push(startDate);
    } else if (endDate) {
      query += ' WHERE date <= $1';
      params.push(endDate);
    }
    
    query += ' ORDER BY date DESC, metric_name';
    
    const { rows } = await db.query(query, params);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des métriques' });
  }
};

/**
 * Récupère les métriques par nom
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getMetricsByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { startDate, endDate } = req.query;
    
    let query = 'SELECT * FROM performance_metrics WHERE metric_name = $1';
    const params = [name];
    
    if (startDate && endDate) {
      query += ' AND date BETWEEN $2 AND $3';
      params.push(startDate, endDate);
    } else if (startDate) {
      query += ' AND date >= $2';
      params.push(startDate);
    } else if (endDate) {
      query += ' AND date <= $2';
      params.push(endDate);
    }
    
    query += ' ORDER BY date';
    
    const { rows } = await db.query(query, params);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques par nom:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des métriques par nom' });
  }
};

/**
 * Récupère la tendance d'une métrique spécifique
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getMetricTrend = async (req, res) => {
  try {
    const { name } = req.params;
    
    const query = `
      SELECT 
        metric_name,
        date,
        metric_value,
        metric_value - LAG(metric_value) OVER (ORDER BY date) as change,
        CASE 
          WHEN metric_value > LAG(metric_value) OVER (ORDER BY date) THEN 'up'
          WHEN metric_value < LAG(metric_value) OVER (ORDER BY date) THEN 'down'
          ELSE 'stable'
        END as trend
      FROM performance_metrics
      WHERE metric_name = $1
      ORDER BY date
    `;
    
    const { rows } = await db.query(query, [name]);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tendance de la métrique:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la tendance de la métrique' });
  }
};

module.exports = {
  getAllMetrics,
  getMetricsByName,
  getMetricTrend
}; 