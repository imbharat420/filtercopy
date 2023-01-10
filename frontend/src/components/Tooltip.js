import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  margin-left: -60px;
  transition: opacity 0.3s;

  top: ${({ top }) => top || '150%'};
  left: ${({ left }) => left || '50%'};

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
    left: ${({ left }) => left || '50%'};
  }
`;

const Tooltip = ({ text, children }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      <TooltipText style={{ visibility: hovering ? 'visible' : 'hidden' }}>
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
