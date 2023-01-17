import React, { useRef, useState, useContext } from 'react';
import { MainWrapper, Spinner, CenterWrapper, Code, Para } from '../styled';
import AxiosHandler from '../../api/AxiosHandler';
import { StoreContext } from '../../state/store';

import usePasteEvent from '../../hooks/usePasteEvent';
import { Image, Upload } from '../Icons';

const imgAxios = async (formData, dispatch) => {
  try {
    let axios = AxiosHandler();
    const { data } = await axios.post('/edit/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.response?.data });
    console.log('errpr', err);
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

  usePasteEvent((file) => {
    if (file.type.startsWith('image/')) {
      setFormData(file);
      setImage(URL.createObjectURL(file));
    } else {
      // handle non-image paste events
    }
  });

  const sendImage = async () => {
    if (!image) {
      imageInputRef.current.click();
      return;
    }

    // send image to server
    if (image === undefined) return;
    dispatch({ type: 'LOADING' });
    let data = await imgAxios({ avatar: formData }, dispatch);
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
          <span style={{ fontWeight: '' }}>
            <CenterWrapper>
              <Image />
            </CenterWrapper>
            <Para> Drop an image or click to select a file</Para>
            <Para>
              or Paste an image using <Code marginLeft="0px"> Ctrl+V</Code> or
              <Code> CMD+V </Code>
            </Para>
          </span>
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
          state.loading === true ? (
            <Spinner size="20px" borderWidth="3px" borderColor="white" />
          ) : (
            <CenterWrapper>
              <Upload /> &nbsp; Upload
            </CenterWrapper>
          )
        ) : (
          <CenterWrapper>
            {/* <Select /> */}
            Select a file
          </CenterWrapper>
        )}
      </button>
    </MainWrapper>
  );
}

export default DragAndDropImage;
