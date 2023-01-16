import styled, { css, keyframes } from 'styled-components';

import img from '../assets/sprite.png';
import xmass from '../assets/xmass.png';
import overlays from '../assets/overlays.png';

const Primary = '#18191b';
const Secondary = '#252627';
const Shadow = '#3b3c3d';

const White = '#fff';
const DarkWhite = '#e0d9fc';
const hv = 'hsla(0,0%,100%,0.7)';

const scrollBar = css`
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${DarkWhite};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${hv};
  }
`;

const overflowed = css`
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: ${Primary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Secondary};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${Shadow};
  }
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterWrapper = styled.span`
  ${center}
`;

const SpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightFlex = css`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const button = css`
  width: 100%;
  margin-top: 1rem;
  border: none;
  color: #fff;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;

const Input = css`
  width: 300px;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
  background: none;
  color: #fff;
  outline: none;
  border: 1px solid transparent;
  &:focus,
  &:hover {
    border: 1px solid ${DarkWhite};
  }
`;

export const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const List = css`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100vh;
    ${scrollBar}
    overflow-y: auto;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 1.7rem;
      cursor: pointer;
      user-select: none;
      img {
        height: 80px;
        width: 128px;
        top: 7px;
        left: 10px;
        margin: 0;
        margin: 0.2rem 2rem;
      }
      span {
        font-size: 0.8rem;
        color: #fff;
      }
    }
`;

export const SidebarWrapper = styled.div`
  height: 100vh;
  background-color: ${Primary};
  color: ${White};
  font-size: 0.8rem;
  padding: 10px;
`;

export const SubSidebarWrapper = styled.div`
  position: relative;
  min-width: 150px;
  height: 100vh;
  overflow: hidden;
  background-color: ${Secondary};
  border-left: 0.2px solid ${Shadow};
  border-right: 0.2px solid ${Shadow};
  padding-right: 5px;
  ${List}
  }
`;

export const ZoneWrapper = styled.div`
  position: relative;
  padding-right: 5px;
  min-width: 150px;
  height: 100vh;
  background-color: ${Secondary};
  border-right: 0.2px solid ${Shadow};
  ${List}
  }
`;

export const DrawerOuter = styled.div`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translate(100%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
  pointer-events: all !important;
  .drawer {
    position: absolute;
  }
  .chevron {
    position: absolute;
  }
`;

export const Option = styled.div`
  ${center}
  flex-direction: column;
  width: 60px;
  height: 72px;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Icon = styled.div`
    margin-bottom: 10px;
    background-image: url(${img});
    background-repeat: no-repeat; 
    ${({ icon }) =>
      icon === `artistic` &&
      css`
        background-position: -90px -149px;
        width: 20px;
        height: 22px;
        &:hover {
          background-position: -58px -149px;
        }
      `}} 
     ${({ icon }) =>
       icon === `fun` &&
       css`
         background-position: -57px -118px;
         width: 28px;
         height: 17px;
         &:hover {
           background-position: -89px -118px;
         }
       `}}
    ${({ icon }) =>
      icon === `e-cards` &&
      css`
        background-position: -121px -118px;
        width: 28px;
        height: 17px;
        &:hover {
          background-position: -150px -118px;
        }
      `}}
    ${({ icon }) =>
      icon === `christmas` &&
      css`
        background-image: url(${xmass});
        background-position: 0 0;
        width: 24px;
        height: 26px;
        &:hover {
          background-position: -26px 0;
        }
      `}}    
    ${({ icon }) =>
      icon === `thanksgiving` &&
      css`
        background-position: -57px -118px;
        width: 28px;
        height: 17px;
        &:hover {
          background-position: -26px 0;
        }
      `}}
     ${({ icon }) =>
       icon === `overlays` &&
       css`
         background-image: url(${overlays});
         width: 22px;
         height: 20px;
         &:hover {
           background-position: -22px 0;
         }
       `}}
`;

export const ImageContainer = styled.div`
  position: relative;
  ${overflowed}
  white-space: nowrap;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  touch-action: pan-x pan-y;
  @media (max-width: 768px) {
    width: 100%;
  }
  img {
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 300px;
  min-width: 300px;
  width: 50%;
  max-width: 500px;
  background-color: #fff;
  padding: 3rem;
  border-radius: 10px;
  overflow: hidden;
  .img {
    height: -webkit-fill-available;
    width: -webkit-fill-available;
  }
  .btn {
    ${button};
    background-color: ${Primary};
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #000;
      box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.3);
    }
  }
  .dropzone {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const TopbarContainer = styled.div`
  position: sticky;
  top: 0;
  ${SpaceBetween};
  width: 100%;
  background-color: ${Secondary};
  height: 49px;
  padding: 0 8px;
  border-bottom: 0.2px solid ${Shadow};
  .buttons {
    ${RightFlex}
  }
  .input-name {
    ${Input}
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const BottombarContainer = styled.div`
  position: sticky;
  top: 0;
  ${SpaceBetween};
  width: 100%;
  background-color: ${Secondary};
  height: 49px;
  padding: 0 8px;
  border-top: 0.2px solid ${Shadow};
  .buttons {
    ${RightFlex}
  }
  .input-name {
    ${Input}
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 5px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  &:hover {
    background: rgba(225, 225, 225, 0.1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  max-width: ${(props) => (props.size ? props.size : '48px')};
  max-width: ${(props) => (props.size ? props.size : '48px')};
  min-height: ${(props) => (props.size ? props.size : '48px')};
  min-width: ${(props) => (props.size ? props.size : '48px')};
  color: rgba(90, 90, 90, 0.2);
  position: relative;
  display: inline-block;
  border: ${(props) => (props.borderWidth ? props.borderWidth : '5px')} solid;
  border-radius: 50%;
  border-right-color: ${(props) =>
    props.borderColor ? props.borderColor : '#5a5a5a'};
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto;
`;

export const Loading = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Code = styled.span`
  border-radius: 5px;
  border: 1px solid #000;
  padding: 0.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0.2rem')};})
`;

export const Para = styled.p`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  display: inline-block;
  right: 10px;
  bottom: 10px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-left: 10px solid #fa5d5c;
  color: ${Primary};
  padding: 0.6rem 0.8rem;
  font-size: 0.6rem;
  .btn {
    ${button};
    background-color: ${Primary};
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #000;
      box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const RangeContainer = styled.div`
  grid-area: slider;
  height: 16px;
`;

export const RangeWrapper = styled.div`
  grid-area: slider;
  height: 16px;
`;

export const RangeTackle = styled.div``;
export const RangeProgress = styled.div``;
export const RangeSlider = styled.div``;
export const RangeThumb = styled.div``;

/*

  top: 10px;
  right: 10px;
  position: absolute;
  background-color: rgba(64, 70, 78, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 1px #fff;
  border-radius: 3px;
  padding: 4px 4px 2px;
  margin-top: 20px;
  display: inline-block;
  .buttons {
    .btn {
      ${button}
      padding: 0 20px;
      height: 40px;
      margin: auto;
      display: inline-block;
      cursor: pointer;
      text-align: center;
    }
  }
  .submit {
    ${pinkButton}
  }
*/
