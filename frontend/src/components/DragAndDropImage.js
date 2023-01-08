import React, { useRef, useState, useContext } from 'react';
import { MainWrapper, Spinner, CenterWrapper, Code, Para } from './styled';
import AxiosHandler from '../api/AxiosHandler';
import { StoreContext } from '../state/store';

import usePasteEvent from '../hooks/usePasteEvent';

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
          'Select a file'
        )}
      </button>
    </MainWrapper>
  );
}

export default DragAndDropImage;

const Upload = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.75 13.81v7.44a.75.75 0 1 1-1.5 0v-7.4L9.49 15.6a.75.75 0 1 1-1.06-1.06l2.35-2.36c.68-.68 1.8-.68 2.48 0l2.35 2.36a.75.75 0 1 1-1.06 1.06l-1.8-1.8zM9 18v1.5H6.75v-.01A5.63 5.63 0 0 1 5.01 8.66a6 6 0 0 1 11.94-.4 5.63 5.63 0 0 1 .3 11.23v.01H15V18h1.88a4.12 4.12 0 1 0-1.5-7.97A4.51 4.51 0 0 0 11 4.5a4.5 4.5 0 0 0-4.43 5.29 4.13 4.13 0 0 0 .68 8.2V18H9z"
      ></path>
    </svg>
  );
};

const Image = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70px"
      height="70px"
      viewBox="0 0 24 24"
    >
      <path
        fill="#252627"
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 1.5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.5h14a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5zm5.75 10.1 3.05-4.15a2 2 0 0 1 3.22-.01L21 15.78V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-.09l3.82-5.25a2 2 0 0 1 3.22 0l.7.95zm3.6 4.9H19a.5.5 0 0 0 .5-.5v-2.72l-3.69-4.94a.5.5 0 0 0-.8 0l-3.33 4.53 2.68 3.63zm-5.51-4.96a.5.5 0 0 0-.81 0l-3.44 4.74a.5.5 0 0 0 .41.22h7.5l-3.66-4.96zM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      ></path>
    </svg>
  );
};
