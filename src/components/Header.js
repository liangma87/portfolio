import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import classnames from 'classnames';
import AuthService from './auth/AuthService';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false
    };
    this.auth = new AuthService();
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  userLogout() {
    this.auth.logout();
    this.forceUpdate();
  }

  render() {
    const isLoggedIn = this.auth.loggedIn();

    return (
      <div className="Header">
        <Navbar color="inverse" fixed-top light expand="md">
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto text-left" tabs>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  {this.props.navItem}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.props.onNavItemsClick("Todos")}>Todos</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.props.onNavItemsClick("Diaries")}>Diaries</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto text-left" navbar>
              <NavItem>
                  {isLoggedIn ? (
                    <Button
                      color="primary"
                      onClick={() => this.userLogout()}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link 
                      to="/login"
                    >
                      <Button
                        color="primary"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
