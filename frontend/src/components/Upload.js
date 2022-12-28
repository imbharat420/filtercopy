import { useState, useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../state/store';
import AxiosHandler from '../api/AxiosHandler';

const imgAxios = async (formData) => {
  let axios = AxiosHandler();
  try {
    const { data } = await axios.post('/edit/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const ImageUploadForm = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await imgAxios({ avatar: image });
    console.log(data);
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_IMAGE' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;

/*
 // const reader = new FileReader();
    // reader.onload = () => {
    //   dispatch({ payload: reader.result, type: 'CHANGE_IMAGE' });
    //   // setImageUrl(reader.result);
    //   //  const blob = new Blob([reader.result], { type: image.type });
    //   // let blobUrl = window.URL.createObjectURL(blob);
    //   //  setImageUrl(blobUrl);
    //   // console.log(reader.result);
    // };
    // reader.readAsDataURL(image);
    */
