import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { Button } from 'reactstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import classnames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import AuthService from './auth/AuthService';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false,
        activeTab: '1',
    };

    this.auth = new AuthService();
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  onToggleTab(tab) {
    this.setState({
      activeTab: tab
    });
    this.props.toggleTab(tab);
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
          {/*<NavbarBrand href="/">Home</NavbarBrand>*/}
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto text-left" tabs>
              <NavItem>
                  <NavLink
                    to = {'/'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    Bagger-Research
                  </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto text-left" navbar>
              {/*<NavItem>
                <Form inline>
                  <FormGroup>
                    <InputGroup>
                    <Input
                      type="search"
                      name="search"
                      id="stockSearch"
                      placeholder="Search by symbol"
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="link"><FontAwesomeIcon icon={faSearch} /></Button>
                    </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </NavItem>*/}
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
