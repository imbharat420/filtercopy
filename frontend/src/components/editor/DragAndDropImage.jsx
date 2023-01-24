import React, { useRef, useState, useContext } from 'react';
import { MainWrapper, Spinner, CenterWrapper, Code, Para } from '../styled';

import { StoreContext } from '../../state/store';

import usePasteEvent from '../../hooks/usePasteEvent';
import { Image, Upload } from '../Icons';

import {imgAxios} from "../../action/ImageAction"
import { useNavigate } from 'react-router-dom';


function DragAndDropImage() {
  const navigate = useNavigate();


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



  /** 
   * @Desc send image on server
   */


  const sendImage = async () => {
    if (!image) {
      imageInputRef.current.click();
      return;
    }

    if (image === undefined){
      // check if File otherwise show error
       dispatch({ payload: "Attach a file", type: 'ERROR' });
      return
    };
    

    // send image to server
    dispatch({ type: 'LOADING' });
    let data = await imgAxios({ avatar: formData }, dispatch);
    navigate(`/design/${data?.id}`);
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
