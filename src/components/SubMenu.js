import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarLink = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  list-style: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    cursor: pointer;
  }

  @media(max-width: 430px){
    font-size: 1.5rem;}
`;

const SidebarLabel = styled.span`
  margin-left: 14px;
`;

const DropdownLink = styled.div`
  margin-left: 80px;
  padding: 1.2rem;
  display: flex;
  color:#A9A9A9;
  font-size: 18px;
  @media(max-width: 430px){
    font-size: 1.5rem;}
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink>
             {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
