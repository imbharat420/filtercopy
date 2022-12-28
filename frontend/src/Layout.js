import styled, { css } from 'styled-components';
import img from './assets/sprite.png';
import xmass from './assets/xmass.png';

export const Wrapper = styled.div`
  height: 100vh;
  background-color: #42474f;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
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
        background-position: -57px -118px;
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
`;
