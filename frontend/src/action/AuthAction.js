import AxiosHandler from '../api/AxiosHandler';
import { getJWT } from '../utils/LocalAuth';

/**
 * !DESC  LOGIN
 */

export const LoginAction = async (formData, dispatch) => {
  try {
    let axios = AxiosHandler();
    const { data } = await axios.post(`/auth/login`, formData);
    dispatch({ payload: data, type: 'LOGIN' });
  } catch (err) {
    console.log(err);
    dispatch({ payload: err, type: 'ERROR' });
  }
};

/**
 * !DESC  REGISTER
 */
export const RegisterAction = async (formData, dispatch) => {
  let axios = AxiosHandler();
  try {
    const { data } = await axios.post(`/auth/register`, formData);
    dispatch({ payload: data, type: 'REGISTER' });
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'ERROR' });
  }
};

/**
 * !DESC  LOAD USER WHEN REFRESH
 */
export const loadUser = async (dispatch) => {
  let axios = AxiosHandler();
  console.log('loadUser', getJWT());
  try {
    const { data } = await axios.get(`/auth/check`);
    dispatch({ payload: data, type: 'LOAD_USER' });
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'ERROR' });
  }
};
