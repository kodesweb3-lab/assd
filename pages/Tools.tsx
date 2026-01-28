import React from 'react';
import { ResponsivePage } from '../components/ResponsivePage';
import ToolsMobile from './ToolsMobile';
import ToolsDesktop from './ToolsDesktop';

/**
 * Tools/Domains Page
 * 
 * Renders mobile or desktop version based on screen size.
 */

interface ToolsProps {
  onSearchToggle?: (show: boolean) => void;
}

const Tools: React.FC<ToolsProps> = ({ onSearchToggle }) => {
  return (
    <ResponsivePage
      mobile={<ToolsMobile onSearchToggle={onSearchToggle} />}
      desktop={<ToolsDesktop />}
    />
  );
};

export default Tools;
