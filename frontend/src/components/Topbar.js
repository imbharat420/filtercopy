import { useContext, useState } from 'react';
import { StoreContext } from '../state/store';
import { TopbarContainer, IconContainer, CenterWrapper } from './styled';
import { Delete, TimeIcon, DownloadImage } from './Icons';
import download from '../hooks/useDownload';

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
        <IconContainer marginRight="2px" onClick={download}>
          <DownloadImage />
        </IconContainer>
        <IconContainer onClick={handleImageChange}>
          <Delete />
        </IconContainer>
      </div>
    </TopbarContainer>
  );
};
export default Topbar;
