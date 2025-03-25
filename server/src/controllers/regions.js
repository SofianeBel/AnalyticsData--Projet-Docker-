/**
 * Contrôleur pour la gestion des régions
 * Contient la logique métier pour les opérations sur les régions
 */

const db = require('../config/db');

/**
 * Récupère toutes les régions
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getAllRegions = async (req, res) => {
  try {
    const query = 'SELECT * FROM regions ORDER BY name';
    const { rows } = await db.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des régions:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des régions' });
  }
};

/**
 * Récupère une région spécifique par son ID
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM regions WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Région non trouvée' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la région:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la région' });
  }
};

module.exports = {
  getAllRegions,
  getRegionById
}; 