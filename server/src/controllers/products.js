/**
 * Contrôleur pour la gestion des produits
 * Contient la logique métier pour les opérations sur les produits
 */

const db = require('../config/db');

/**
 * Récupère tous les produits
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getAllProducts = async (req, res) => {
  try {
    const query = 'SELECT * FROM products ORDER BY name';
    const { rows } = await db.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
};

/**
 * Récupère les produits groupés par catégorie
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getProductsByCategory = async (req, res) => {
  try {
    const query = `
      SELECT category, 
             JSON_AGG(
               JSON_BUILD_OBJECT(
                 'id', id,
                 'name', name,
                 'price', price
               )
             ) as products
      FROM products
      GROUP BY category
      ORDER BY category
    `;
    
    const { rows } = await db.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits par catégorie:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits par catégorie' });
  }
};

/**
 * Récupère un produit spécifique par son ID
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById
}; 