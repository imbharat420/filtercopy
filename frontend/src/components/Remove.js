import { useContext } from 'react';
import { StoreContext } from '../state/store';
import { UploadContainer, IconContainer } from './styled';
// import Delete from '../assets/Delete.svg';

const Remove = () => {
  const { state, dispatch } = useContext(StoreContext);

  const handleImageChange = (e) => {
    dispatch({ type: 'REMOVE_IMAGE' });
  };

  return (
    <UploadContainer>
      <div className="">
        <input
          type="text"
          placeholder="Image URL"
          class="input-name"
          value={'Expires at ' + state.image?.expires_at}
        />
      </div>
      <div className="buttons">
        <IconContainer onClick={handleImageChange}>
          <Delete />
        </IconContainer>
      </div>
    </UploadContainer>
  );
};

const Delete = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"
      ></path>
    </svg>
  );
};

export default Remove;

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
