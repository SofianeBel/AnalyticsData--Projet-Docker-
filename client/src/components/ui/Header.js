/**
 * Composant Header
 * Affiche l'en-tête de l'application avec le titre et la navigation
 */

import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo>Analytics Dashboard</Logo>
          <Nav>
            <NavItem active>Dashboard</NavItem>
            <NavItem>Rapports</NavItem>
            <NavItem>Paramètres</NavItem>
          </Nav>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

// Styled components
const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  padding: 5px 0;
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: #3498db;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    
    &:after {
      width: 100%;
    }
  }
`;

export default Header; 