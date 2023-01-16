import { useContext } from 'react';
import { StoreContext } from '../state/store';

import { ZoneWrapper, DrawerOuter } from './styled';
import { Chevron, Drawer } from './Icons';

import { filterImage } from '../action/ImageAction';
import socketDispatch from '../socket/socketDispatch';
import { socket } from '../socket';

const Zone = () => {
  const {
    state: { image, effects, currentEffectIndex, currentZoneIndex },
    dispatch,
  } = useContext(StoreContext);

  const setFilterImage = (id) => {
    filterImage({ id, image }, dispatch);
  };

  socket.on('update-image', (data) => {
    dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
  });
  return (
    <ZoneWrapper className="effects-zone">
      <ul>
        {effects[currentEffectIndex].zones[currentZoneIndex].effects.map(
          (zone, index) => (
            <li
              className="zone-item"
              key={`${zone.name}`}
              onClick={() => setFilterImage(`${zone.api_id}`)}
            >
              <img
                src={`https://${zone.image_url}`}
                alt={`${zone.name}`}
                border="0"
              />
              <span>{zone.name}</span>
            </li>
          )
        )}
      </ul>
      <DrawerOuter>
        <Chevron />
        <Drawer />
      </DrawerOuter>
    </ZoneWrapper>
  );
};

export default Zone;
