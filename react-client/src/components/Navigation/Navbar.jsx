import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import profileLogo from '../../img/profile-logo.png'
import webLogo from '../../images/IntrendshipLogo.png'
import { IconContext } from 'react-icons/lib';
import './Myprofile.scss';
import '../../style/Button.scss';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  NavLogout,
} from './Navbar.elements';
import { useDetectOutsideClick } from '../../utils/useDetectOutsiderClick';


export function Navbar(props) {

  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive((prev) => !prev);
  }

  const [click, setClick] = useState(false);
  const [button, setbutton] = useState(true);

  const roles = props.roles.map(r => r.name);

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
  }, []);

  window.addEventListener('resize', showbutton);
  console.log(props.currentUser)
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      {props.authenticated ? (
        <Nav>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
              <img src={webLogo} alt="weblogo" height={50} />
              INTRENDSHIP
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
                  Jobs
                </NavLinks>
              </NavItem>
              <NavItem>
              {roles.includes('ROLE_COMPANY') && (     
                <NavLinks to='/candidate-listing' onClick={closeMobileMenu}>
                  Candidate
                </NavLinks>
              )}
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
                        {props.currentUser.imageUrl ? (
                          <img src={props.currentUser.imageUrl} alt={props.currentUser.name} />
                        ) : (
                          <img src={profileLogo} alt=''></img>
                        )
                        }
                        <div ref={dropdownRef} className={`menu ${show || isActive ? "active" : "inactive"}`}>
                          <ul>

                            {roles.includes('ROLE_CANDIDATE') && (
                              <>
                                <li>
                                  <NavLinks to='/user/dashboard'>
                                    My Profile
                                  </NavLinks>
                                </li>
                                <li>
                                  <NavLinks to='/user/job-history'>
                                    Application history
                                  </NavLinks>
                                </li>
                              </>
                            )}
                            {roles.includes('ROLE_COMPANY') && (
                              <>
                                <li>
                                  <NavLinks to='/company-dashboard'>
                                    My Company
                                  </NavLinks>
                                </li>
                                <li>
                                  <NavLinks to='/jobposted'>
                                    My Posted Jobs
                                  </NavLinks>
                                </li>
                              </>
                            )}

                            <li onClick={props.onLogout}>
                              <NavLinks to="#" style={{ color: 'red' }}>
                                Logout
                              </NavLinks>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <span className="caret"></span>
                    <div className="welcome-text">
                      {roles.includes('ROLE_CANDIDATE') && (
                        props.currentUser.candidate.firstName 
                      )}
                      {roles.includes('ROLE_COMPANY') && (
                        props.currentUser.company.companyName 
                      )}
                    </div>
                  </NavBtnLink>
                ) : (
                  <NavItem>
                    {roles.includes('ROLE_CANDIDATE') && (
                      <>
                        <NavLinks to='/user/profile/me' onClick={closeMobileMenu}>
                          My Profile
                        </NavLinks>
                        <NavLinks to='/user/job-history' onClick={closeMobileMenu}>
                          Application history
                        </NavLinks>
                      </>
                    )}
                    {roles.includes('ROLE_CANDIDATE') && (
                      <>
                        <NavLinks to='/company/dashboard' onClick={closeMobileMenu}>
                          My Company
                        </NavLinks>
                        <NavLinks to='/jobposted' onClick={closeMobileMenu}>
                          My Posted Jobs
                        </NavLinks>
                      </>
                    )}
                    <NavLogout onClick={props.onLogout}>
                      <p>Logout</p>
                    </NavLogout>
                  </NavItem>

                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>

      ) : (

        <Nav>
          <NavbarContainer>

            <NavLogo to='/' onClick={closeMobileMenu}>
              <img src={webLogo} alt="weblogo" height={50} />
              INRENDSHIP
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
                  Jobs
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
