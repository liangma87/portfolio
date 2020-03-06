import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardTitle,
  CardText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { getStockApiUrl } from "../helpers/utils.js";

// Edelgard is a service that renders notes

const EditThoughtMod = (props) => {
  const {
    isOpen,
    className,
    stockName,
    title,
    notes,
    onToggleClick,
    onNotesChange,
    onSumbitClick
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onToggleClick} className={className} >
        <ModalHeader toggle={onToggleClick}>{stockName}</ModalHeader>
        <ModalBody>
          <p>{title}</p>          
          <Input 
            type="textarea" 
            value={notes}
            rows={10}
            onChange={onNotesChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSumbitClick}>Submit</Button>{' '}
          <Button color="secondary" onClick={onToggleClick}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


const NoteCard = ({title, note, date, thought_id, onEditClick, onDeleteClick}) => {

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
          <DropdownItem onClick={() => onEditClick(thought_id)}>
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => onDeleteClick(thought_id)}>
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
      thoughts: [],
      isModOpen: false,
      modThoughtID: -1,
      modThoughtNotes: "Serios",
      modThoughtTitle: "Serios"
    };
  }

  componentDidMount() {
    this.fetchThoughts()
  }

  fetchThoughts = () => {
    var url = getStockApiUrl("thoughts")
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({modThoughtID: res[0].id, thoughts: res, modThoughtNotes: res[0].notes})
    })
    .catch((err) => alert(err));
  }

  onToggleClick = (modThoughtID=-1) => {
    if(!this.state.isModOpen) {
      var thought = this.state.thoughts.filter(thought => 
                        thought.id === modThoughtID);
      this.setState({modThoughtID: modThoughtID, modThoughtNotes: thought[0].notes, modThoughtTitle: thought[0].title})
    }
    this.setState({isModOpen: !this.state.isModOpen})
  }

  onThoughtEditSumbit = (event) => {
    event.preventDefault();
    this.onToggleClick()

    var url = getStockApiUrl("thoughts") + this.state.modThoughtID
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({thought: {notes: this.state.modThoughtNotes}}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
    })
    .then(res => {
      var thoughts = this.state.thoughts
      var index = thoughts.findIndex(thought => thought.id === this.state.modThoughtID)
      thoughts[index].notes = this.state.modThoughtNotes
      thoughts[index].updated_at = new Date().toISOString()
      this.setState({thoughts: thoughts})
    })
    .catch(error => console.error('Error:', error));

  }

  onThoughtDeleteClick = (thought_id) => {
    var url = getStockApiUrl("thoughts") + thought_id
    fetch(url, {
      method: 'DELETE',
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      var thoughts = this.state.thoughts
      var new_thoughts = thoughts.filter(thought => thought.id !== thought_id)
      this.setState({thoughts: new_thoughts})
    })
    .catch(error => console.error('Error:', error));
  }

  onEditThoughtNotesChange = (event) => {
    this.setState({modThoughtNotes: event.target.value});
  }

  render() {

    const thoughts = this.state.thoughts
    var selected = thoughts.filter(thought => 
                  this.props.stock.id === thought.company_id);

    // How do you distinguish between thoughts not fetched or no thoughts
    if(selected.length <= 0) {
      return (<div>Loading.....</div>)
    }

    return (
      <div>
        <div className="d-flex justify-content-start align-content-start flex-wrap">
          {selected.map((thought) => (
            <NoteCard
              key={thought.id}
              title={thought.title}
              note={thought.notes}
              date={thought.updated_at.split('T')[0]}
              thought_id={thought.id}
              onEditClick={this.onToggleClick}
              onDeleteClick={this.onThoughtDeleteClick}
            />
          ))}
        </div>
        <EditThoughtMod
          isOpen={this.state.isModOpen}
          stockName={this.props.stock.symbol}
          notes={this.state.modThoughtNotes}
          title={this.state.modThoughtTitle}
          onNotesChange={this.onEditThoughtNotesChange}
          onSumbitClick={this.onThoughtEditSumbit}
          onToggleClick={this.onToggleClick}
        />
      </div>
    )
  }
}

export default Edelgard
