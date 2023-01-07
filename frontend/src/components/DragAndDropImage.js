import React, { useRef, useState, useContext } from 'react';
import { MainWrapper, Spinner } from './styled';
import AxiosHandler from '../api/AxiosHandler';
import { StoreContext } from '../state/store';

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

function DragAndDropImage() {
  const { state, dispatch } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  let [formData, setFormData] = useState({});
  const imageInputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(URL.createObjectURL(file));
  }

  function handleImageInputChange(e) {
    const file = e.target.files[0];
    setFormData(file);
    setImage(URL.createObjectURL(file));
  }

  const sendImage = async () => {
    if (!image) {
      imageInputRef.current.click();
      return;
    }

    // send image to server
    if (image === undefined) return;
    dispatch({ type: 'LOADING' });
    let data = await imgAxios({ avatar: formData });
    if (data) {
      dispatch({ payload: data, type: 'CHANGE_IMAGE' });
    }
  };

  return (
    <MainWrapper onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="dropzone">
        {image ? (
          <img
            className="img"
            src={image}
            alt="Preview"
            style={{ width: '100%' }}
          />
        ) : (
          'Drop an image or click to select a file'
        )}
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageInputChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>

      <button className="btn" onClick={sendImage} style={{ width: '100%' }}>
        {image ? (
          state.loading ? (
            <Spinner size="20px" borderWidth="3px" borderColor="white" />
          ) : (
            'Upload'
          )
        ) : (
          'Select a file'
        )}
      </button>
    </MainWrapper>
  );
}

export default DragAndDropImage;
