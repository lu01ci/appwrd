import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Actividad = styled.div`
  font-size: 2.5rem;
  color: white;
  height: 4.8rem;
  width: 80%;
  text-align: center;
  @media(max-width: 1400px){
    font-size: 2.4rem; height: 4.3rem;}
  @media(max-width: 1100px){
    font-size: 2.3rem;height: 3.7rem;}
  @media(max-width: 900px){
    font-size: 2rem;height: 3.5rem;}
  @media(max-width: 800px){
    font-size: 1.9rem;
    height: 3rem;}
  @media(max-width: 430px){
    font-size: 1.4rem;}
`;

const NavIcon = styled(Link)`
  margin-left: 2.5rem;
  font-size: 2rem;
  height: 80px;
  width: 7%;
  display: flex;
  align-items: center;
  @media(max-width: 1400px){
    font-size: 1.9rem;}
  @media(max-width: 1100px){
    font-size: 1.8rem;}
  @media(max-width: 900px){
    font-size: 1.7rem;}
  @media(max-width: 800px){
    font-size: 1.5rem;}
  @media(max-width: 430px){
    font-size: 1.4rem;}
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 320px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  @media(max-width: 430px){
    width: 220px;
    font-size: 1rem;}
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Actividad class="header">
              CONTENEDORES
            </Actividad>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
