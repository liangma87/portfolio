import React from 'react'
import PropTypes from 'prop-types'
import {
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Dropdown 
} from 'reactstrap';

class TodoSetting extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: "All"
    };
  }

  changeValue(e) {
    this.setState({dropDownValue: e.currentTarget.textContent});
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.dropDownValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.changeValue}>All</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Active</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Completed</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default TodoSetting