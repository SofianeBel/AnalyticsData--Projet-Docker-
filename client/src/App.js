import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Composants
import Header from './components/ui/Header';
import SalesOverview from './components/dashboard/SalesOverview';
import RegionalSales from './components/dashboard/RegionalSales';
import ProductPerformance from './components/dashboard/ProductPerformance';
import MetricsCard from './components/dashboard/MetricsCard';
import SalesTrend from './components/dashboard/SalesTrend';

// API
import { fetchSalesData, fetchMetricsData } from './api/dashboardApi';

/**
 * Composant principal de l'application
 * Gère l'état global et les filtres du dashboard
 */
const App = () => {
  // État pour les dates
  const [startDate, setStartDate] = useState(new Date(2023, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2023, 11, 31));
  
  // État pour les données
  const [salesData, setSalesData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement des données au montage et lorsque les filtres changent
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Formatage des dates pour l'API
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        // Chargement des données en parallèle
        const [salesResponse, metricsResponse] = await Promise.all([
          fetchSalesData(formattedStartDate, formattedEndDate),
          fetchMetricsData(formattedStartDate, formattedEndDate)
        ]);
        
        setSalesData(salesResponse);
        setMetricsData(metricsResponse);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données du dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [startDate, endDate]);

  return (
    <AppContainer>
      <Header />
      <main className="container">
        <FiltersContainer>
          <FilterGroup>
            <FilterLabel>Période de début:</FilterLabel>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Période de fin:</FilterLabel>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
            />
          </FilterGroup>
        </FiltersContainer>
        
        {loading ? (
          <LoadingMessage>Chargement des données...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <Dashboard>
            {/* Première rangée */}
            <SalesOverview data={salesData?.byDate} />
            <MetricsCard 
              title="Taux de Conversion" 
              metric={metricsData?.find(m => m.metric_name === 'Conversion Rate')} 
            />
            <MetricsCard 
              title="Taux d'Abandon" 
              metric={metricsData?.find(m => m.metric_name === 'Cart Abandonment')} 
            />
            
            {/* Deuxième rangée */}
            <SalesTrend data={salesData?.byDate} />
            <RegionalSales data={salesData?.byRegion} />
            <ProductPerformance data={salesData?.byProduct} />
          </Dashboard>
        )}
      </main>
    </AppContainer>
  );
};

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  
  .date-picker {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const FilterLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #e74c3c;
  background-color: #fceaea;
  border-radius: 8px;
`;

export default App; 