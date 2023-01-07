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
    background: 'transparent';
  }
  ::-webkit-scrollbar-thumb {
    background: ${DarkWhite};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${hv};
  }
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 20px;
  color: #333;
  border-radius: 4px;
  border: 1px solid #666;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 30%);
  text-shadow: 0 1px 0 #fff;
  background: -webkit-linear-gradient(top, #ececed 0, #ccc 100%);
  background: linear-gradient(to bottom, #ececed 0, #ccc 100%);
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

export const List = css`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 1.7rem;
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
export const SubSidebarWrapper = styled.div`
${scrollBar}
  min-width: 150px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${Secondary};
  border-left: 0.2px solid ${Shadow};
  border-right: 0.2px solid ${Shadow};
  ${List}
  }
`;

export const SidebarWrapper = styled.div`
  height: 100vh;
  background-color: ${Primary};
  color: ${White};
  font-size: 0.8rem;
  padding: 10px;
`;

export const ZoneWrapper = styled.div`
  ${scrollBar}
  min-width: 150px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${Secondary};
   border-right: 0.2px solid ${Shadow};
  ${List}
  }
`;

export const Option = styled.div`
  ${center}
  flex-direction: column;
  margin: 10px;
  width: 60px;
  height: 72px;
`;

export const Icon = styled.div`
    margin-bottom: 10px;
    background-image: url(${img});
    background-repeat: no-repeat; 
    ${({ icon }) =>
      icon === `artistic` &&
      css`
        background-position: -58px -149px;
        width: 20px;
        height: 22px;
      `}} 
     ${({ icon }) =>
       icon === `fun` &&
       css`
         background-position: -57px -118px;
         width: 28px;
         height: 17px;
       `}}
    ${({ icon }) =>
      icon === `e-cards` &&
      css`
        background-position: -121px -118px;
        width: 28px;
        height: 17px;
      `}}
    ${({ icon }) =>
      icon === `christmas` &&
      css`
        background-image: url(${xmass});
        background-position: 0 0;
        width: 24px;
        height: 26px;
      `}}    
    ${({ icon }) =>
      icon === `thanksgiving` &&
      css`
        background-position: -57px -118px;
        width: 28px;
        height: 17px;
      `}}
     ${({ icon }) =>
       icon === `overlays` &&
       css`
         background-image: url(${overlays});
         width: 22px;
         height: 20px;
       `}}
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  bacground: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 500px;
  min-width: 500px;
  max-height: 500px;
  max-width: 500px;
  background-color: #fff;
  padding: 3rem;
  border-radius: 10px;
  .img {
    height: -webkit-fill-available;
    width: -webkit-fill-available;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    background-color: ${Primary};
    border: none;
    color: #fff;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .dropzone {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const UploadContainer = styled.div`
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
  }
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 5px;
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
