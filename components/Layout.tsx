"use client"
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;  
  background-color: #fff;
  z-index: 10;
`;

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;  
  background-color: #fff;
  z-index: 10;
`;

const StyledSidebar = styled.div`
  position: fixed;
  top: 60px;  
  bottom: 40px;  
  left: 0;
  width: 200px; 
  background-color: #f4f4f4;
  overflow-y: auto;  
  z-index: 5;
`;

const StyledMain = styled.main`
  margin-left: 200px;  
  margin-top: 60px;  
  margin-bottom: 40px;  
  overflow-y: auto;  
  padding: 20px;
  flex: 1;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <StyledHeader>
        <Header />
      </StyledHeader>
      <MainContainer>
        <StyledSidebar>
          <Sidebar />
        </StyledSidebar>
        <StyledMain>
          {children}
        </StyledMain>
      </MainContainer>
      <StyledFooter>
        <Footer />
      </StyledFooter>
    </LayoutContainer>
  );
};

export default Layout;
