import { useContext } from 'react';
import { SubSidebarWrapper } from '../styled';
import { StoreContext } from '../../state/store';
const SubSidebar = () => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <SubSidebarWrapper className="effects-zone">
      <ul>
        {state.effects[state.currentEffectIndex].zones.map((zone, index) => (
          <li
            className="zone-item"
            key={`${zone.name}`}
            onClick={() =>
              dispatch({ type: 'SIDEBAR_ZONE_INDEX', payload: index })
            }
          >
            <img
              src={`https://${zone.image_url}`}
              alt={`${zone.name}`}
              border="0"
            />
            <span>{zone.name}</span>
          </li>
        ))}
      </ul>
    </SubSidebarWrapper>
  );
};

export default SubSidebar;
