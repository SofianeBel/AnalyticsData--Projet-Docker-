/**
 * Service API pour les données du dashboard
 * Gère les appels HTTP vers le backend
 */

import axios from 'axios';

// URL de base de l'API backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Client axios configuré pour l'API
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Récupère toutes les données de ventes nécessaires pour le dashboard
 * @param {string} startDate - Date de début au format YYYY-MM-DD
 * @param {string} endDate - Date de fin au format YYYY-MM-DD
 * @returns {Promise<object>} Données de ventes structurées
 */
export const fetchSalesData = async (startDate, endDate) => {
  try {
    // Récupération des données en parallèle
    const [byRegionRes, byProductRes, byDateRes] = await Promise.all([
      apiClient.get(`/sales/by-region?startDate=${startDate}&endDate=${endDate}`),
      apiClient.get(`/sales/by-product?startDate=${startDate}&endDate=${endDate}`),
      apiClient.get(`/sales/by-date?startDate=${startDate}&endDate=${endDate}`),
    ]);

    return {
      byRegion: byRegionRes.data,
      byProduct: byProductRes.data,
      byDate: byDateRes.data,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données de ventes:', error);
    throw error;
  }
};

/**
 * Récupère les métriques de performance
 * @param {string} startDate - Date de début au format YYYY-MM-DD
 * @param {string} endDate - Date de fin au format YYYY-MM-DD
 * @returns {Promise<Array>} Liste des métriques
 */
export const fetchMetricsData = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(
      `/metrics?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques:', error);
    throw error;
  }
};

/**
 * Récupère la tendance d'une métrique spécifique
 * @param {string} metricName - Nom de la métrique
 * @returns {Promise<Array>} Données de tendance de la métrique
 */
export const fetchMetricTrend = async (metricName) => {
  try {
    const response = await apiClient.get(`/metrics/trend/${metricName}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la tendance de ${metricName}:`, error);
    throw error;
  }
}; 