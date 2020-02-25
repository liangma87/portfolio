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
      diaries: []
    };
  }

  componentDidMount() {
    fetch("http://0.0.0.0:3040/api/diaries")
    .then((res) => res.json())
    .then((res) => {
      this.setState({diaries: res})
    })
    .catch((err) => alert(err));
  }

  render() {

    const diaries = this.state.diaries

    return (
      <div className="d-flex justify-content-start align-content-start flex-wrap">
        {diaries.map((diary) => (
          <NoteCard
            key={diary.id}
            title={diary.title}
            note={diary.notes}
            date={diary.updated_at.split('T')[0]}
          />
        ))}
      </div>
    )
  }
}

export default Edelgard