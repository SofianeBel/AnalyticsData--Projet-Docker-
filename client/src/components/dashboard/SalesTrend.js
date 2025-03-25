/**
 * Composant SalesTrend
 * Affiche la tendance des ventes avec un graphique en ligne
 */

import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

/**
 * @param {object} props - Propriétés du composant
 * @param {Array} props.data - Données de ventes par période
 */
const SalesTrend = ({ data }) => {
  // Si les données ne sont pas disponibles, afficher un message
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tendance des Ventes</CardTitle>
        </CardHeader>
        <NoDataMessage>Aucune donnée disponible</NoDataMessage>
      </Card>
    );
  }

  // Formatage des données pour le graphique
  const chartData = data.map(item => ({
    period: item.period,
    amount: parseFloat(item.total_amount),
    quantity: parseInt(item.total_quantity)
  }));

  // Formatage personnalisé pour le tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipItem>
            <TooltipColor color="#3498db" />
            Ventes: {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            }).format(payload[0].value)}
          </TooltipItem>
          <TooltipItem>
            <TooltipColor color="#e74c3c" />
            Quantité: {payload[1].value}
          </TooltipItem>
        </TooltipContainer>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendance des Ventes</CardTitle>
      </CardHeader>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" orientation="left" stroke="#3498db" />
            <YAxis yAxisId="right" orientation="right" stroke="#e74c3c" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#3498db"
              name="Ventes"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="quantity"
              stroke="#e74c3c"
              name="Quantité"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
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
  margin-bottom: 8px;
  color: #333;
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #666;
`;

const TooltipColor = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  margin-right: 5px;
  border-radius: 2px;
`;

export default SalesTrend; 