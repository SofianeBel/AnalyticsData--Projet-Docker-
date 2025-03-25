/**
 * Configuration de la connexion à la base de données PostgreSQL
 * Ce module gère la connexion à la base de données PostgreSQL en utilisant le package pg
 */

const { Pool } = require('pg');

// Récupération des variables d'environnement pour la connexion à la BDD
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'analytics',
});

// Test de connexion à la base de données
pool.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
  } else {
    console.log('Connexion réussie à la base de données PostgreSQL');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
}; 