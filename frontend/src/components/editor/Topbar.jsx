import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../state/store';
import { useCanvasContext } from '../../state/canvas';
import { TopbarContainer, IconContainer, CenterWrapper } from '../styled';
import { Delete, TimeIcon, DownloadImage } from '../Icons';
// import { download, copy } from '../hooks/useDownload';
import useCanvasClipboard from '../../hooks/useCanvasClipboard';
import { CopyIcon } from '../Icons';
import Tooltip from '../Tooltip';
const Topbar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const canvasRef = useCanvasContext();

  const [download, copy, isCopied] = useCanvasClipboard(canvasRef);

  useEffect(() => {
    console.log('isCopied', isCopied);
  }, [isCopied]);
  const [value, setValue] = useState('Expires at ' + state.uploadedImage?.expires_at);

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
        <Tooltip text={!isCopied ? 'Copy' : 'Copied'}>
          <IconContainer marginRight="2px" onClick={copy} title="Copy">
            <CopyIcon />
          </IconContainer>
        </Tooltip>
        <Tooltip text="Download">
          <IconContainer marginRight="2px" onClick={download} title="Download">
            <DownloadImage />
          </IconContainer>
        </Tooltip>
        <Tooltip text="Delete">
          <IconContainer onClick={handleImageChange} title="Delete">
            <Delete />
          </IconContainer>
        </Tooltip>
      </div>
    </TopbarContainer>
  );
};
export default Topbar;
