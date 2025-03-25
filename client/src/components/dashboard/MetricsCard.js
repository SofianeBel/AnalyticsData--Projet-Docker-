/**
 * Composant MetricsCard
 * Affiche une carte avec une métrique clé et sa tendance
 */

import React from 'react';
import styled from 'styled-components';

/**
 * @param {object} props - Propriétés du composant
 * @param {string} props.title - Titre de la métrique
 * @param {object} props.metric - Données de la métrique
 */
const MetricsCard = ({ title, metric }) => {
  // Si les données ne sont pas disponibles, afficher un message
  if (!metric) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <NoDataMessage>Aucune donnée disponible</NoDataMessage>
      </Card>
    );
  }

  // Déterminer l'icône et la couleur selon la tendance
  const getTrendInfo = () => {
    const metricValue = parseFloat(metric.metric_value);
    // Simple example of trend determination based on the metric name
    // In a real app, we'd compare with previous values
    if (metric.metric_name === 'Conversion Rate') {
      return metricValue > 4.5 
        ? { icon: '↗', color: '#2ecc71', label: 'En hausse' }
        : { icon: '↘', color: '#e74c3c', label: 'En baisse' };
    } else if (metric.metric_name === 'Cart Abandonment') {
      return metricValue < 20 
        ? { icon: '↘', color: '#2ecc71', label: 'En baisse' } 
        : { icon: '↗', color: '#e74c3c', label: 'En hausse' };
    } else {
      return metricValue > 140 
        ? { icon: '↗', color: '#2ecc71', label: 'En hausse' }
        : { icon: '↘', color: '#e74c3c', label: 'En baisse' };
    }
  };

  const trendInfo = getTrendInfo();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <MetricValue>
        {metric.metric_name === 'Conversion Rate' || metric.metric_name === 'Cart Abandonment'
          ? `${metric.metric_value}%`
          : new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            }).format(metric.metric_value)
        }
      </MetricValue>
      
      <TrendContainer color={trendInfo.color}>
        <TrendIcon>{trendInfo.icon}</TrendIcon>
        <TrendLabel>{trendInfo.label}</TrendLabel>
      </TrendContainer>
      
      <DateInfo>
        Dernière mise à jour: {new Date(metric.date).toLocaleDateString('fr-FR')}
      </DateInfo>
    </Card>
  );
};

// Styled components
const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const TrendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: ${props => props.color};
`;

const TrendIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 5px;
`;

const TrendLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const DateInfo = styled.div`
  margin-top: auto;
  font-size: 0.8rem;
  color: #999;
  font-style: italic;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #999;
  font-style: italic;
`;

export default MetricsCard; 