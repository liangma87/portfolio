import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Form, Button, FormGroup, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false,
        activeTab: '1'
    };
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

  render() {
    return (
      <div className="Header">
        <Navbar color="inverse" fixed-top light expand="md">
          {/*<NavbarBrand href="/">Home</NavbarBrand>*/}
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto text-left" tabs>
              <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.onToggleTab('1'); }}
                  >
                    Portfolio
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.onToggleTab('2'); }}
                  >
                    Ideas
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.onToggleTab('3'); }}
                  >
                    Todos
                  </NavLink>
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
