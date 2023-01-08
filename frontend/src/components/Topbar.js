import { useContext, useState } from 'react';
import { StoreContext } from '../state/store';
import { TopbarContainer, IconContainer, CenterWrapper } from './styled';
// import Delete from '../assets/Delete.svg';

const Topbar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [value, setValue] = useState('Expires at ' + state.image?.expires_at);

  const handleImageChange = (e) => {
    dispatch({ type: 'REMOVE_IMAGE' });
  };

  return (
    <TopbarContainer>
      <div className="">
        <CenterWrapper>
          <TimeIcon />
          <input
            style={{ marginLeft: '5px' }}
            type="text"
            placeholder="Set Name"
            className="input-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </CenterWrapper>
      </div>
      <div className="buttons">
        <IconContainer onClick={handleImageChange}>
          <Delete />
        </IconContainer>
      </div>
    </TopbarContainer>
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

const TimeIcon = () => {
  return (
    <svg
      aria-label="Your Activity"
      color="#fafafa"
      fill="#fafafa"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M12 1.505a10.5 10.5 0 11-7.424 17.924"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
      <polyline
        fill="none"
        points="8.893 15.108 12 12 12.012 12.012 12.012 5.793"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></polyline>
      <circle cx="7.24" cy="2.651" r="1.125"></circle>
      <circle cx="3.515" cy="5.83" r="1.125"></circle>
      <circle cx="1.636" cy="10.353" r="1.125"></circle>
      <circle cx="2.01" cy="15.235" r="1.125"></circle>
    </svg>
  );
};

export default Topbar;

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
