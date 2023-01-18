import AxiosHandler from '../api/AxiosHandler';
import { socket } from '../socket';

export const filterImage = async ({ id, image }, dispatch) => {
  dispatch({ type: 'LOADING' });
  const filterData = {
    effectId: id,
    photoId: image.id,
  };

  try {
    let axios = AxiosHandler();
    const { data } = await axios.post('/edit/render', filterData);

    if (data) {
      dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
      socket && socket.emit('image', data);
    }
  } catch (err) {
    dispatch({ payload: err, type: 'ERROR' });
  }
};

// export const updateImageSocket = (dispatch) => {
//   if (socket) return;
//   socket.on('update-image', (data) => {
//     console.log('wwooowow');
//     dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
//   });
// };
