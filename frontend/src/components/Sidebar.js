import { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import { Icon, Wrapper } from '../Layout';
import { StoreContext } from '../state/store';

const Sidebar = ({ clicHandler }) => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <Wrapper>
      <ul className="categories">
        {state?.effects &&
          state?.effects.map((effect, index) => (
            <li
              key={effect.name}
              onClick={() =>
                dispatch({ type: 'SIDEBAR_INDEX', payload: index })
              }
            >
              <div id="item">
                <Icon icon={`${effect.name.toLowerCase()}`}></Icon>
                <span>{effect.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
