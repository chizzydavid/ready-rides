import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../utils/responsive";
import menuStyles from "./menuStyles";

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
  `};
`;

const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-sm
    md:text-base
    text-black
    font-medium
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:text-gray-700
  `};

  ${({ menu }) =>
    menu &&
    css`
      ${tw`
      text-white
      text-xl
      mb-3
      focus:text-white
    `};
    `};
`;

const NavItems = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <button >Home</button>
          </NavItem>
          <NavItem menu>
            <button >Cars</button>
          </NavItem>
          <NavItem menu>
            <button >Services</button>
          </NavItem>
          <NavItem menu>
            <button > Contact Us</button>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <NavItem>
        <button >Home</button>
      </NavItem>
      <NavItem>
        <button >Cars</button>
      </NavItem>
      <NavItem>
        <button >Services</button>
      </NavItem>
      <NavItem>
        <button >Contact Us</button>
      </NavItem>
    </ListContainer>
  );
}

export default NavItems;

