import React, { useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../state/store';
function ImageUploadForm() {
  const { state, dispatch } = React.useContext(StoreContext);
  const [image, setImage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      dispatch({ payload: reader.result, type: 'CHANGE_IMAGE' });
      // setImageUrl(reader.result);
      //  const blob = new Blob([reader.result], { type: image.type });
      // let blobUrl = window.URL.createObjectURL(blob);
      //  setImageUrl(blobUrl);
      console.log(reader.result);
      //  console.log(image,blobUrl,reader.result);
    };
    reader.readAsDataURL(image);
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
}

export default ImageUploadForm;
