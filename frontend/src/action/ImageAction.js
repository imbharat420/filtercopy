import AxiosHandler from '../api/AxiosHandler';
import { socket } from '../socket';

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

export const filterImage = async ({ id, image }, dispatch) => {
  dispatch({ type: 'LOADING' });

  const filterData = {
    effectId: id,
    photoId: image.id,
  };
  let data = await filterAxios(filterData);
  socket.emit('image', data);
  if (data) {
    dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
  }
};

export const updateImageSocket = (dispatch) => {
  if (socket) return;
  socket.on('update-image', (data) => {
    console.log('wwooowow');
    dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
  });
};
