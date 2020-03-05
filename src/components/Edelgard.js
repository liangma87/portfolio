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

const EditDiaryMod = (props) => {
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


const NoteCard = ({title, note, date, diary_id, onEditClick, onDeleteClick}) => {

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
          <DropdownItem onClick={() => onEditClick(diary_id)}>
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => onDeleteClick(diary_id)}>
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
      diaries: [],
      isModOpen: false,
      modDiaryID: -1,
      modDiaryNotes: "Serios",
      modDiaryTitle: "Serios"
    };
  }

  componentDidMount() {
    this.fetchDiaries()
  }

  fetchDiaries = () => {
    var url = getStockApiUrl("diaries")
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({modDiaryID: res[0].id, diaries: res, modDiaryNotes: res[0].notes})
    })
    .catch((err) => alert(err));
  }

  onToggleClick = (modDiaryID=-1) => {
    if(!this.state.isModOpen) {
      var diary = this.state.diaries.filter(diary => 
                        diary.id === modDiaryID);
      this.setState({modDiaryID: modDiaryID, modDiaryNotes: diary[0].notes, modDiaryTitle: diary[0].title})
    }
    this.setState({isModOpen: !this.state.isModOpen})
  }

  onDiaryEditSumbit = (event) => {
    event.preventDefault();
    this.onToggleClick()

    var url = getStockApiUrl("diaries") + this.state.modDiaryID
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({diary: {notes: this.state.modDiaryNotes}}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
    })
    .then(res => {
      var diaries = this.state.diaries
      var index = diaries.findIndex(diary => diary.id === this.state.modDiaryID)
      diaries[index].notes = this.state.modDiaryNotes
      diaries[index].updated_at = new Date().toISOString()
      this.setState({diaries: diaries})
    })
    .catch(error => console.error('Error:', error));

  }

  onDiaryDeleteClick = (diary_id) => {
    var url = getStockApiUrl("diaries") + diary_id
    fetch(url, {
      method: 'DELETE',
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      var diaries = this.state.diaries
      var new_diaries = diaries.filter(diary => diary.id !== diary_id)
      this.setState({diaries: new_diaries})
    })
    .catch(error => console.error('Error:', error));
  }

  onEditDiaryNotesChange = (event) => {
    this.setState({modDiaryNotes: event.target.value});
  }

  render() {

    const diaries = this.state.diaries
    var selected = diaries.filter(diary => 
                  this.props.stock.id === diary.company_id);

    // How do you distinguish between diaries not fetched or no diaries
    if(selected.length <= 0) {
      return (<div>Loading.....</div>)
    }

    return (
      <div>
        <div className="d-flex justify-content-start align-content-start flex-wrap">
          {selected.map((diary) => (
            <NoteCard
              key={diary.id}
              title={diary.title}
              note={diary.notes}
              date={diary.updated_at.split('T')[0]}
              diary_id={diary.id}
              onEditClick={this.onToggleClick}
              onDeleteClick={this.onDiaryDeleteClick}
            />
          ))}
        </div>
        <EditDiaryMod
          isOpen={this.state.isModOpen}
          stockName={this.props.stock.symbol}
          notes={this.state.modDiaryNotes}
          title={this.state.modDiaryTitle}
          onNotesChange={this.onEditDiaryNotesChange}
          onSumbitClick={this.onDiaryEditSumbit}
          onToggleClick={this.onToggleClick}
        />
      </div>
    )
  }
}

export default Edelgard