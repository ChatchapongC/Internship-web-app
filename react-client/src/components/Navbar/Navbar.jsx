import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
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

export function Navbar(props) {
  const [click, setClick] = useState(false);
  const [state, setState] = useState({});
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
    return () => {
      setState({});
    }
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      
        {props.authenticated ? (
          <Nav>
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
                    <NavBtnLink to='/profile'>
                      <button className="btn">My Profile</button>
                    </NavBtnLink>
                  ) : (
                    <NavItem>
                      <NavLinks to='/profile' onClick={closeMobileMenu}>
                        My Profile
                      </NavLinks>
                    </NavItem>
                  )}
                </NavItemBtn>
                <NavItem>
                  <NavLinks onClick={props.onLogout}>
                    Logout
                  </NavLinks>
                </NavItem>
              </NavMenu>
            </NavbarContainer>
          </Nav>

        ):(

          <Nav>
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
                    <NavBtnLink to='/login'>
                      <button className="btn">SIGN IN</button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink to='/login'>
                      <button className="btn" onClick={closeMobileMenu} >
                        SIGN IN
                      </button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              </NavMenu>
            </NavbarContainer>
          </Nav>
        )}
    </IconContext.Provider>
   )
}

export default Navbar;
