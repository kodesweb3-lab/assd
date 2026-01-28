import React from 'react';
import { ResponsivePage } from '../components/ResponsivePage';
import HomeMobile from './HomeMobile';
import HomeDesktop from './HomeDesktop';

/**
 * Home Page
 * 
 * Renders mobile or desktop version based on screen size.
 */

const Home: React.FC = () => {
  return (
    <ResponsivePage
      mobile={<HomeMobile />}
      desktop={<HomeDesktop />}
    />
  );
};

export default Home;
