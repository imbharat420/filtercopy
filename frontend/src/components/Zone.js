import { useContext } from 'react';
import { StoreContext } from '../state/store';
import AxiosHandler from '../api/AxiosHandler';
import { ZoneWrapper, DrawerOuter } from './styled';
import { Chevron, Drawer } from './Icons';

const filterAxios = async (formData) => {
  console.log('formData', formData);
  let axios = AxiosHandler();
  try {
    const { data } = await axios.post('/edit/render', formData);
    return data;
  } catch (err) {
    console.log('Error : ', err);
  }
};

const Zone = () => {
  const { state, dispatch } = useContext(StoreContext);

  const filterImage = async (id) => {
    dispatch({ type: 'LOADING' });
    if (id === undefined || state.image.id === undefined) {
      return;
    }
    const filterData = {
      effectId: id,
      photoId: state.image.id,
    };
    let data = await filterAxios(filterData);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
    }
  };

  return (
    <ZoneWrapper className="effects-zone">
      <ul>
        {state.effects[state.currentEffectIndex].zones[
          state.currentZoneIndex
        ].effects.map((zone, index) => (
          <li
            className="zone-item"
            key={`${zone.name}`}
            onClick={() => filterImage(`${zone.api_id}`)}
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
      <DrawerOuter>
        <Chevron />
        <Drawer />
      </DrawerOuter>
    </ZoneWrapper>
  );
};

export default Zone;
