import { useContext } from 'react';

import { SidebarWrapper, Icon, Option } from './styled';
import { StoreContext } from '../state/store';

const Sidebar = ({ clicHandler }) => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <SidebarWrapper>
      <ul className="categories">
        {state?.effects &&
          state?.effects.map((effect, index) => (
            <li
              key={effect.name}
              onClick={() =>
                dispatch({ type: 'SIDEBAR_INDEX', payload: index })
              }
            >
              <Option id="item">
                <Icon icon={`${effect.name.toLowerCase()}`}></Icon>
                <span>{effect.name}</span>
              </Option>
            </li>
          ))}
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
