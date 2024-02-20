import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 700px; /* Increased maximum width */
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const path = document.getElementById('lemniscate');
    setPathLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    const dot = document.getElementById('dot');
    const path = document.getElementById('lemniscate');
    const totalDuration = 9800; // Total duration for the dot to travel the entire path
    const textDuration = 800; // Duration before the words start appearing
    let progress = 0;

    const animate = () => {
      dot.style.visibility = 'visible';
      const interval = setInterval(() => {
        const point = path.getPointAtLength(progress);
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
        path.style.strokeDasharray = progress + ' ' + pathLength; // Set the stroke-dasharray to control the appearance of the path
        progress += (totalDuration / 1000); // Increment the progress based on total duration
        if (progress >= textDuration) {
          dot.style.visibility = 'hidden';
          clearInterval(interval); // Stop the animation once the dot completes the path
          finishLoading(); // Notify when the loader animation finishes
        }
      }, 20);
      return interval;
    };

    const timeout = setTimeout(() => {
      setIsMounted(true);
      animate();
    }, 10);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathLength, finishLoading]);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <div className="logo-wrapper">
        {/* Lemniscate Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 600 600"> {/* Increased dimensions */}
          {/* Path for Lemniscate */}
          <path id="lemniscate" d="M300,300 
                                      C450,480 450,120 300,300 
                                      C150,480 150,120 300,300"
                                      fill="none" stroke="hsl(162, 95%, 78%)" strokeWidth="10" strokeDasharray="0 100000" /> {/* Initial stroke-dasharray with a large value */}
          {/* Dot */}
          <circle id="dot" cx="300" cy="300" r="12" fill="hsl(162, 95%, 78%)" style={{ visibility: 'hidden' }} />
        </svg>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
