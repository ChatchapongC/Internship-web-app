import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import profileLogo from '../../img/profile-logo.png'
import './Myprofile.scss';
import '../Button.scss';
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
  NavBtnLink,
  NavProfileBtnLink
} from './Navbar.elements';

export function Navbar(props) {
  const [click, setClick] = useState(false);
  const [state, setState] = useState({});
  const [button, setbutton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showbutton = () => {
    if (window.innerWidth <= 960) {
      setbutton(false);
    } else {
      setbutton(true);
    }
  };

  useEffect(() => {
    showbutton();
    return () => {
      setState({});
    }
  }, []);

  window.addEventListener('resize', showbutton);

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
                  <NavLinks to='/' onClick={closeMobileMenu}>
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
                      <div className="container">
                        <div className="outer">
                          <div className="inner">
                            <label>
                            </label>
                          </div>
                        </div>
                      </div>
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
                  <NavLinks to='/' onClick={closeMobileMenu}>
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
