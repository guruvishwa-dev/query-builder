import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import { ModalsProvider } from '@mantine/modals';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import NavbarSimple from './frontend/NavbarSimple';
import { HtmlValidator } from './frontend/htmlvalidator';
import LoginPage from './frontend/login';
import { QueryDash } from './frontend/querydash';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <MantineProvider>
      <ModalsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <div style={{ display: 'flex' }}>
                    <NavbarSimple />
                    <div style={{ flex: 1, padding: '20px' }}>
                      <Routes>
                      <Route path="/" element={<WelcomeMainPage />} />
                        <Route path="/main/html-val" element={<HtmlValidator />} />
                        <Route path="/main/query-dash" element={<QueryDash />} />
                        {/* Add more routes for other components */}
                      </Routes>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </ModalsProvider>
    </MantineProvider>
  );
}

 function WelcomeMainPage(){
  return<h1>Welcome Main page</h1>
}

export default App;
