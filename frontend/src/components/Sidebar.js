import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { Icon, Wrapper } from '../Layout';

const Sidebar = ({ sidebarData }) => {
  return (
    <Wrapper>
      <ul className="categories">
        <li key={'index'}>
          <div id="item">
            <Icon icon="artistic"></Icon>
            <span>Artistic</span>
          </div>
        </li>
        {/* <li key={'index'}>
          <div id="item">
            <Icon icon="christmas"></Icon>
            <span>Artistic</span>
          </div>
        </li>
        <li key={'index'}>
          <div id="item">
            <Icon icon="e-cards"></Icon>
            <span>Artistic</span>
          </div>
        </li>
        <li key={'index'}>
          <div id="item">
            <Icon icon="e-cards"></Icon>
            <span>Artistic</span>
          </div>
        </li> */}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;

/*
  {sidebarData && sidebarData.effects.map((item,index)=>{
                    return(
                        <li key={index}>
                            <div id={item.id}>
                              
                                <span>{item.name}</span>
                            </div>
                        </li>
                 )})}
                 */
