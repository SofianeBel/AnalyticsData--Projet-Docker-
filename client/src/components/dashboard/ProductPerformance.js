/**
 * Composant ProductPerformance
 * Affiche les performances des produits avec un tableau de classement
 */

import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * @param {object} props - Propriétés du composant
 * @param {Array} props.data - Données de ventes par produit
 */
const ProductPerformance = ({ data }) => {
  // État pour le tri
  const [sortBy, setSortBy] = useState('total_amount');
  const [sortOrder, setSortOrder] = useState('desc');

  // Si les données ne sont pas disponibles, afficher un message
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance des Produits</CardTitle>
        </CardHeader>
        <NoDataMessage>Aucune donnée disponible</NoDataMessage>
      </Card>
    );
  }

  // Fonction pour trier les données
  const handleSort = (field) => {
    if (sortBy === field) {
      // Si on clique sur la même colonne, on inverse l'ordre
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Sinon, on trie par la nouvelle colonne (desc par défaut)
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Tri des données
  const sortedData = [...data].sort((a, b) => {
    const aValue = sortBy === 'product_name' ? a[sortBy] : parseFloat(a[sortBy]);
    const bValue = sortBy === 'product_name' ? b[sortBy] : parseFloat(b[sortBy]);
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance des Produits</CardTitle>
      </CardHeader>
      
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader onClick={() => handleSort('product_name')}>
                Produit
                {sortBy === 'product_name' && (
                  <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                )}
              </TableHeader>
              <TableHeader onClick={() => handleSort('category')}>
                Catégorie
                {sortBy === 'category' && (
                  <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                )}
              </TableHeader>
              <TableHeader onClick={() => handleSort('total_quantity')}>
                Quantité
                {sortBy === 'total_quantity' && (
                  <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                )}
              </TableHeader>
              <TableHeader onClick={() => handleSort('total_amount')}>
                Montant
                {sortBy === 'total_amount' && (
                  <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                )}
              </TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {sortedData.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.total_quantity}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(product.total_amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

const TableContainer = styled.div`
  flex-grow: 1;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: #f1f2f3;
  }
`;

const SortIcon = styled.span`
  margin-left: 5px;
  font-size: 0.8rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f1f2f3;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-style: italic;
`;

export default ProductPerformance; 