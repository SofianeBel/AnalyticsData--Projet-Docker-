/**
 * Point d'entrée principal de l'application serveur
 * Configure et lance le serveur Express avec les middlewares et routes nécessaires
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const salesRoutes = require('./routes/sales');
const productsRoutes = require('./routes/products');
const regionsRoutes = require('./routes/regions');
const metricsRoutes = require('./routes/metrics');

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/sales', salesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/metrics', metricsRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API pour le Dashboard Analytique' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 