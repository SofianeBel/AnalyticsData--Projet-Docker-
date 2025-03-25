/**
 * Composant RegionalSales
 * Affiche la répartition des ventes par région avec un graphique circulaire
 */

import React from 'react';
import styled from 'styled-components';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Couleurs pour les différentes régions
const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];

/**
 * @param {object} props - Propriétés du composant
 * @param {Array} props.data - Données de ventes par région
 */
const RegionalSales = ({ data }) => {
  // Si les données ne sont pas disponibles, afficher un message
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ventes par Région</CardTitle>
        </CardHeader>
        <NoDataMessage>Aucune donnée disponible</NoDataMessage>
      </Card>
    );
  }

  // Formatage des données pour le graphique
  const chartData = data.map((item, index) => ({
    name: item.region_name,
    value: parseFloat(item.total_amount),
    color: COLORS[index % COLORS.length]
  }));

  // Formatage personnalisé pour le tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <TooltipContainer>
          <TooltipLabel>{data.name}</TooltipLabel>
          <TooltipValue>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            }).format(data.value)}
          </TooltipValue>
        </TooltipContainer>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventes par Région</CardTitle>
      </CardHeader>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
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

const ChartContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-style: italic;
`;

const TooltipContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const TooltipValue = styled.div`
  color: #666;
`;

export default RegionalSales; 