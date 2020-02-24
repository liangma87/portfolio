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

// Edelgard is a service that renders notes

const NoteCard = ({title, note, date}) => {

  const cardStyle = {
      flexGrow: 0,
      flexBasis: '25rem'
  };
  return (
  <Card body outline color="secondary" className="text-center ml-2 mb-2" style={cardStyle}>
    <UncontrolledDropdown>
      <CardTitle>
        <DropdownToggle caret tag="span">
          {title}
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
      {note}
    </CardText>
    <CardText>
        <small className="text-muted">
          {date}
        </small>
    </CardText>
  </Card>)
}

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
    return (
      <div className="d-flex justify-content-start align-content-start flex-wrap">
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
        <NoteCard 
          title={"Special Title Treatment"}
          note={"With supporting text below as a natural lead-in to additional content."}
          date={"2020-02-03"}
        />
      </div>
    )
  }
}

export default Edelgard