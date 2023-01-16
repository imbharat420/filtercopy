import { useContext, useState } from 'react';
import { FullScreenIcon } from './Icons';
import {
  RangeWrapper,
  RangeContainer,
  RangeTackle,
  RangeProgress,
  RangeThumb,
  RangeSlider,
  BottombarContainer,
  IconContainer,
} from './styled';
import { CanvasContext } from '../state/canvas';
import useFullScreen from '../hooks/useFullScreen';
import Tooltip from './Tooltip';
const BottomBar = () => {
  const canvasRef = useContext(CanvasContext);
  const handleClick = useFullScreen(canvasRef);

  return (
    <BottombarContainer>
      <div></div>
      <Tooltip text="New" top="-100%" left="-100px">
        <IconContainer onClick={handleClick}>
          <FullScreenIcon />
        </IconContainer>
      </Tooltip>
    </BottombarContainer>
  );
};

export default BottomBar;

const InformIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
      ></path>
    </svg>
  );
};

const CustomRange = () => {
  const range = useState({
    min: 0,
    max: 1.61,
    step: 0.001,
    value: -1.814,
  });
  return (
    <RangeContainer>
      <input
        className="range-input"
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        aria-label="Zoom"
        value={range.value}
      />
      <RangeWrapper>
        <RangeTackle></RangeTackle>
        <RangeProgress width={`${(range.min / range.max) * 100}%`}>
          <RangeSlider>
            <RangeThumb></RangeThumb>
          </RangeSlider>
        </RangeProgress>
      </RangeWrapper>
    </RangeContainer>
  );
};
