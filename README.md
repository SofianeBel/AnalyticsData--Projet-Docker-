# Dashboard Analytique avec Docker

Un dashboard analytique avec visualisation de données utilisant React.js, Node.js/Express et PostgreSQL dans des conteneurs Docker.

## Architecture

Ce projet est composé de trois conteneurs Docker distincts :

1. **Frontend** (React.js) : Interface utilisateur avec visualisations de données
2. **Backend** (Node.js/Express) : API RESTful pour servir les données
3. **Base de données** (PostgreSQL) : Stockage des données analytiques


## Prérequis

- Docker et Docker Compose
- Git

## Installation et démarrage

1. Cloner le dépôt :
```bash
git clone <url-du-repo>
cd projet_docker
```

2. Lancer les conteneurs avec Docker Compose :
```bash
docker-compose up
```

3. Accéder à l'application :
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:3001
   - Base de données : localhost:5432

## Structure du projet

```
projet_docker/
├── client/                 # Frontend React
│   ├── public/             # Fichiers statiques
│   ├── src/                # Code source React
│   ├── Dockerfile          # Dockerfile pour le frontend
│   └── package.json        # Dépendances frontend
├── server/                 # Backend Node.js/Express
│   ├── src/                # Code source du serveur
│   ├── Dockerfile          # Dockerfile pour le backend
│   └── package.json        # Dépendances backend
├── database/               # Scripts SQL et migrations
│   ├── init.sql            # Script d'initialisation de la BDD
│   └── seed.sql            # Données de test
├── docker-compose.yml      # Configuration des services Docker
└── README.md               # Documentation du projet
```

## Fonctionnalités

- Dashboard de ventes avec filtres par période/région
- Graphiques de tendances sur plusieurs périodes
- Tableaux de données filtrables et triables
- KPIs clés et indicateurs en temps réel

## Développement

### Frontend (React.js)

Le frontend est construit avec :
- React.js pour l'interface utilisateur
- Recharts pour les visualisations
- Styled-components pour le CSS-in-JS
- Axios pour les requêtes API

### Backend (Node.js/Express)

Le backend est construit avec :
- Node.js/Express pour l'API
- PostgreSQL pour la base de données
- Architecture en couches (routes, controllers, services)

### Base de données (PostgreSQL)

Schéma de base de données :
- Table des régions
- Table des produits
- Table des ventes
- Table des métriques de performance