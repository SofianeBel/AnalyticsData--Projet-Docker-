/**
 * Contrôleur pour la gestion des ventes
 * Contient la logique métier pour les opérations sur les ventes
 */

const db = require('../config/db');

/**
 * Récupère toutes les ventes avec pagination et filtres
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getAllSales = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT s.*, p.name as product_name, r.name as region_name 
      FROM sales s
      JOIN products p ON s.product_id = p.id
      JOIN regions r ON s.region_id = r.id
    `;
    
    const params = [];
    let whereClause = '';
    
    if (startDate && endDate) {
      whereClause = 'WHERE s.date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    } else if (startDate) {
      whereClause = 'WHERE s.date >= $1';
      params.push(startDate);
    } else if (endDate) {
      whereClause = 'WHERE s.date <= $1';
      params.push(endDate);
    }
    
    query += whereClause + ` ORDER BY s.date DESC LIMIT ${limit} OFFSET ${offset}`;
    
    const { rows } = await db.query(query, params);
    
    // Compter le nombre total de résultats pour la pagination
    const countQuery = `SELECT COUNT(*) FROM sales s ${whereClause}`;
    const countResult = await db.query(countQuery, params);
    const totalCount = parseInt(countResult.rows[0].count);
    
    res.json({
      data: rows,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ventes' });
  }
};

/**
 * Récupère les ventes groupées par région
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getSalesByRegion = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = `
      SELECT r.name as region_name, r.code as region_code,
             SUM(s.quantity) as total_quantity,
             SUM(s.total_amount) as total_amount
      FROM sales s
      JOIN regions r ON s.region_id = r.id
    `;
    
    const params = [];
    let whereClause = '';
    
    if (startDate && endDate) {
      whereClause = 'WHERE s.date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    } else if (startDate) {
      whereClause = 'WHERE s.date >= $1';
      params.push(startDate);
    } else if (endDate) {
      whereClause = 'WHERE s.date <= $1';
      params.push(endDate);
    }
    
    query += whereClause + ' GROUP BY r.name, r.code ORDER BY total_amount DESC';
    
    const { rows } = await db.query(query, params);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes par région:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ventes par région' });
  }
};

/**
 * Récupère les ventes groupées par produit
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getSalesByProduct = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = `
      SELECT p.name as product_name, p.category,
             SUM(s.quantity) as total_quantity,
             SUM(s.total_amount) as total_amount
      FROM sales s
      JOIN products p ON s.product_id = p.id
    `;
    
    const params = [];
    let whereClause = '';
    
    if (startDate && endDate) {
      whereClause = 'WHERE s.date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    } else if (startDate) {
      whereClause = 'WHERE s.date >= $1';
      params.push(startDate);
    } else if (endDate) {
      whereClause = 'WHERE s.date <= $1';
      params.push(endDate);
    }
    
    query += whereClause + ' GROUP BY p.name, p.category ORDER BY total_amount DESC';
    
    const { rows } = await db.query(query, params);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes par produit:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ventes par produit' });
  }
};

/**
 * Récupère les ventes groupées par date
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getSalesByDate = async (req, res) => {
  try {
    const { period = 'month' } = req.query; // 'day', 'month', 'year'
    
    let dateFormat;
    if (period === 'day') {
      dateFormat = 'YYYY-MM-DD';
    } else if (period === 'month') {
      dateFormat = 'YYYY-MM';
    } else {
      dateFormat = 'YYYY';
    }
    
    const query = `
      SELECT TO_CHAR(s.date, '${dateFormat}') as period,
             SUM(s.quantity) as total_quantity,
             SUM(s.total_amount) as total_amount
      FROM sales s
      GROUP BY period
      ORDER BY period
    `;
    
    const { rows } = await db.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes par date:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ventes par date' });
  }
};

/**
 * Récupère une vente spécifique par son ID
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT s.*, p.name as product_name, r.name as region_name 
      FROM sales s
      JOIN products p ON s.product_id = p.id
      JOIN regions r ON s.region_id = r.id
      WHERE s.id = $1
    `;
    
    const { rows } = await db.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Vente non trouvée' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la vente:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la vente' });
  }
};

module.exports = {
  getAllSales,
  getSalesByRegion,
  getSalesByProduct,
  getSalesByDate,
  getSaleById
}; 