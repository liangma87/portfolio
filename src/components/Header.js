import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Form, Button, FormGroup, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false
    };
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  render() {
    return (
      <div className="Header">
        <Navbar color="inverse" fixed-top light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto text-left" navbar>
              <NavItem>
                  <NavLink href="#" active>Portfolio</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="#">Ideas</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="#">Todos</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto text-left" navbar>
              <NavItem>
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
              </NavItem>
              <NavItem>
                  <NavLink href="#">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
