import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const StyledProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.scroll}%;
  height: 3px;
  background: linear-gradient(90deg, ${colors.green}, ${colors.lightestSlate});
  z-index: 1002;
  transition: width 0.1s ease-out;
`;

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      setScroll(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <StyledProgressBar scroll={scroll} />;
};

export default ScrollProgress;
