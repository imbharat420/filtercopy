import { useContext, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../state/store';
import AxiosHandler from '../api/AxiosHandler';

const filterAxios = async (formData) => {
  console.log('formData', formData);
  let axios = AxiosHandler();
  try {
    const { data } = await axios.post('/edit/render', formData);
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error : ', err);
  }
};

const Zone = () => {
  const { state, dispatch } = useContext(StoreContext);

  const [image, setImage] = useState(null);
  const filterImage = async (id) => {
    const filterData = {
      effectId: id,
      photoId: state.image.id,
    };
    console.log(filterData);
    let data = await filterAxios(filterData);
    console.log(data);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_IMAGE' });
    }
  };
  console.log(state);
  return (
    <Wrapper className="effects-zone">
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
    </Wrapper>
  );
};

export default Zone;

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #5e6268;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 1.7rem;
      img {
        // position: absolute;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 80px;
        width: 128px;
        top: 7px;
        left: 10px;
        margin: 0;
        margin-bottom: 1rem;
      }
      span {
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
`;
