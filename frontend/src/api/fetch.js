import AxiosHandler from './AxiosHandler.js';
const fetch = async (formData, dispatch) => {
  let axios = AxiosHandler();
  try {
    const { data } = await axios.post('/edit/render', formData);
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error : ', err);
  }
};

export default fetch;
