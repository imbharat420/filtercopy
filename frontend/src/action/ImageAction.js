import AxiosHandler from '../api/AxiosHandler';
import { socket } from '../socket';

/**
 * !DESC  GET FILTER IMAGE
 */
export const filterImage = async ({ effectId, photoId, tid }, dispatch) => {
  dispatch({ type: 'LOADING' });
  const filterData = { effectId, photoId, tid };
  console.log('action/filterImage', filterData);

  try {
    let axios = AxiosHandler();
    const { data } = await axios.post(`/edit/render`, filterData);
    console.log(data);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
      socket && socket.emit('image', data);
    }
  } catch (err) {
    dispatch({ payload: err, type: 'ERROR' });
  }
};

/**
 * !DESC  UPLOAD IMAGE
 */
export const imgAxios = async (formData, dispatch) => {
  try {
    let axios = AxiosHandler();
    const { data } = await axios.post('/edit/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('imgAxios', data);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_IMAGE' });
    }

    return data;
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.response?.data });
    console.log('errpr', err);
  }
};

/**
 * !DESC  GET IMAGE BY ID
 */
export const getImgByIdAxios = async (id, dispatch) => {
  try {
    let axios = AxiosHandler();
    const { data } = await axios.get(`/edit/design/${id}`);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_IMAGE' });
    }
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.response?.data });
    console.log('errpr', err);
  }
};

// export const updateImageSocket = (dispatch) => {
//   if (socket) return;
//   socket.on('update-image', (data) => {
//     console.log('wwooowow');
//     dispatch({ payload: data, type: 'CHANGE_FILTER_IMAGE' });
//   });
// };
