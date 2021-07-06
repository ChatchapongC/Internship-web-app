import React, { useState, useEffect, useRef } from 'react';
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
  NavLogout,
  ShowText
} from './Navbar.elements';
import { useDetectOutsideClick } from '../useDetectOutsiderClick';

export function Navbar(props) {
  
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const [click, setClick] = useState(false);
  const [state, setState] = useState({});
  const [button, setbutton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showDropdown = (e) => {
    setShow(!show);
  }

  const hideDropdown = e => {
    setShow(false);
  }
  
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
                  <NavLinks to='/job-listing' onClick={closeMobileMenu}>
                    Job
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='/about-us' onClick={closeMobileMenu}>
                    About Us
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
                    <NavBtnLink onMouseEnter={showDropdown} onMouseLeave={hideDropdown} onClick={onClick}>
                      <div className="container">
                        <div className="outer">
                              {props.currentUser.imageUrl? (
                                  <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
                              ) : (
                                  <img src={profileLogo}></img>
                                )
                              }
                              <div ref={dropdownRef} className={`menu ${show || isActive? "active" : "inactive"}`}>
                                <ul>
                                  <li><NavLinks to='/profile'>
                                        My Profile
                                      </NavLinks>
                                  </li>
                                  <li onClick={props.onLogout}>
                                    <NavLinks style={{ color : 'red' }}>
                                    Logout
                                    </NavLinks>
                                  </li>
                                </ul>
                              </div>
                        </div>
                      </div>
                      <span className="caret"></span>
                      <div className="welcome-text">{props.currentUser.firstName ? props.currentUser.firstName : "User" }</div>
                    </NavBtnLink>
                  ) : (
                    <NavItem>
                      <NavLinks to='/profile' onClick={closeMobileMenu}>
                        My Profile
                      </NavLinks>
                      <NavLogout onClick={props.onLogout}>
                                  <p>Logout</p>
                       </NavLogout>
                    </NavItem>
                    
                  )}
                </NavItemBtn>
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
                  <NavLinks to='/job-listing' onClick={closeMobileMenu}>
                    Job
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
