/**
 * Composant SalesOverview
 * Affiche une vue d'ensemble des ventes avec un graphique en barres
 */

import React from 'react';
import styled from 'styled-components';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/**
 * @param {object} props - Propriétés du composant
 * @param {Array} props.data - Données de ventes par période
 */
const SalesOverview = ({ data }) => {
  // Si les données ne sont pas disponibles, afficher un message
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aperçu des Ventes</CardTitle>
        </CardHeader>
        <NoDataMessage>Aucune donnée disponible</NoDataMessage>
      </Card>
    );
  }

  // Formatage des données pour le graphique
  const chartData = data.map(item => ({
    period: item.period,
    amount: parseFloat(item.total_amount)
  }));

  // Calcul du montant total des ventes
  const totalSales = chartData.reduce((sum, item) => sum + item.amount, 0);
  
  // Formater le montant total avec séparateur de milliers et 2 décimales
  const formattedTotal = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(totalSales);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu des Ventes</CardTitle>
      </CardHeader>
      
      <TotalSales>
        <TotalLabel>Total des ventes</TotalLabel>
        <TotalAmount>{formattedTotal}</TotalAmount>
      </TotalSales>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [
                `${new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(value)}`,
                'Ventes'
              ]}
            />
            <Bar dataKey="amount" fill="#3498db" radius={[4, 4, 0, 0]} />
          </BarChart>
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

const TotalSales = styled.div`
  margin-bottom: 20px;
`;

const TotalLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
`;

const TotalAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
`;

const ChartContainer = styled.div`
  flex-grow: 1;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: #999;
  font-style: italic;
`;

export default SalesOverview; 