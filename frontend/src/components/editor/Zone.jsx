import { useContext } from 'react';
import { useParams } from 'react-router-dom';


import { StoreContext } from '../../state/store';

import { ZoneWrapper, DrawerOuter } from '../styled';
import { Chevron, Drawer } from '../Icons';

import { filterImage } from '../../action/ImageAction';
// import socketDispatch from '../../socket/socketDispatch';
import { socket } from '../../socket';


const Zone = () => {
  const {id} = useParams();

  const {
    state:{ image, effects, currentEffectIndex, currentZoneIndex },
    dispatch,
  } = useContext(StoreContext);


  
  const setFilterImage = async (effectId) => {
    if(id && image?.id){
        await filterImage({ effectId, photoId: image.id,tid:id }, dispatch);
    }
  };

 
  socket?.on && socket?.on('update-image', (data) => {
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
