import React from 'react';
import { ResponsivePage } from '../components/ResponsivePage';
import DashboardMobile from './DashboardMobile';
import DashboardDesktop from './DashboardDesktop';

/**
 * Dashboard Page
 * 
 * Renders mobile or desktop version based on screen size.
 */

const Dashboard: React.FC = () => {
  return (
    <ResponsivePage
      mobile={<DashboardMobile />}
      desktop={<DashboardDesktop />}
    />
  );
};

export default Dashboard;
