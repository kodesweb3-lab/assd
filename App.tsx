import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Ethics from './pages/Ethics';
import Terms from './pages/Terms';
import About from './pages/About';
import Onboarding from './pages/Onboarding';
import ResponsibleUse from './pages/ResponsibleUse';
import AllowedUse from './pages/AllowedUse';
import DisallowedUse from './pages/DisallowedUse';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Rewards from './pages/Rewards';
import Scan from './pages/mobile/Scan';
import Notes from './pages/mobile/Notes';
import Account from './pages/mobile/Account';
import { useResponsiveLayout } from './hooks/useResponsiveLayout';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthorized = localStorage.getItem('fake_authorized') === 'true';
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('fake_authorized') === 'true');
  const { isMobile } = useResponsiveLayout();

  const handleAuthorize = () => {
    localStorage.setItem('fake_authorized', 'true');
    setIsAuthorized(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('fake_authorized');
    setIsAuthorized(false);
  };

  return (
    <Router>
      <Routes>
        {/* Auth Gate Page */}
        <Route path="/auth/login" element={<Onboarding onComplete={handleAuthorize} />} />
        <Route path="/auth/register" element={<Onboarding onComplete={handleAuthorize} />} />
        <Route path="/before-you-begin" element={<Onboarding onComplete={handleAuthorize} />} />
        
        {/* Main Site Pages */}
        <Route path="/" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <About />
          </Layout>
        } />
        <Route path="/domains" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <Tools />
          </Layout>
        } />
        <Route path="/tools" element={<Navigate to="/domains" replace />} />
        
        <Route path="/research-ethics" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <Ethics />
          </Layout>
        } />
        <Route path="/ethics" element={<Navigate to="/research-ethics" replace />} />
        
        <Route path="/terms" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <Terms />
          </Layout>
        } />
        <Route path="/responsible-use" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <ResponsibleUse />
          </Layout>
        } />
        <Route path="/allowed-use" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <AllowedUse />
          </Layout>
        } />
        <Route path="/disallowed-use" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <DisallowedUse />
          </Layout>
        } />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <AuthGuard>
            <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          </AuthGuard>
        } />
        <Route path="/dashboard/billing" element={
          <AuthGuard>
            <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
              <Billing />
            </Layout>
          </AuthGuard>
        } />
        <Route path="/dashboard/rewards" element={
          <AuthGuard>
            <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
              <Rewards />
            </Layout>
          </AuthGuard>
        } />

        {/* Mobile-specific routes */}
        <Route path="/scan" element={
          <AuthGuard>
            <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
              <Scan />
            </Layout>
          </AuthGuard>
        } />
        <Route path="/notes" element={
          <AuthGuard>
            <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
              <Notes />
            </Layout>
          </AuthGuard>
        } />
        <Route path="/account" element={
          <Layout isAuthorized={isAuthorized} onLogout={handleLogout}>
            <Account isAuthorized={isAuthorized} onLogout={handleLogout} />
          </Layout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
