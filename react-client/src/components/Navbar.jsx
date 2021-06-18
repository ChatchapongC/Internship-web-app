import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { BrowserRouter, Link } from 'react-router-dom';
import './Navbar.scss';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink
} from './Navbar.elements';

export function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
        <BrowserRouter>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
              <NavIcon/>
              INTERNSHIP
            </NavLogo>
         
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to='/homepage' onClick={closeMobileMenu}>
                  Homepage
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/search applicants' onClick={closeMobileMenu}>
                  Search Applicants
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/varieties' onClick={closeMobileMenu}>
                  Varieties
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/blog' onClick={closeMobileMenu}>
                  Blog
                </NavLinks>
              </NavItem>
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to='/signup'>
                    <button className="btn">SIGN UP</button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/signup'>
                    <button className="btn" onClick={closeMobileMenu} >
                      SIGN UP
                    </button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to='/signin'>
                    <button className="btn">SIGN IN</button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/signin'>
                    <button className="btn" onClick={closeMobileMenu} >
                      SIGN IN
                    </button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
          </BrowserRouter>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
