import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';

// TODO center the text

// Edelgard is a service that renders notes
class Edelgard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
  }

  render() {

    const cardStyle = {
      flexGrow: 0,
      flexBasis: '25rem'
    };

    return (
      <div className="d-flex justify-content-start align-content-start flex-wrap">
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
          </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
          </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
            </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
            </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
            </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
        <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
          <UncontrolledDropdown>
            <CardTitle>
                <DropdownToggle caret tag="span">
                  Special Title Treatment
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
            </CardTitle>
          </UncontrolledDropdown>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
            With supporting text below as a natural lead-in to additional content.
            With supporting text below as a natural lead-in to additional content.
            </CardText>
          <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Edelgard