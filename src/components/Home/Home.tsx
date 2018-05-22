import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import * as React from 'react';
import './App.css';
import LeftBar from './components/leftbar/leftBar';
import NotesField from './components/notesField';
import TitleBar from './components/titleBar';
import db from './db';

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class HomePage extends React.Component<{classes: any}, {title: string, body: string, id: any,   notes: any [] }> {

  constructor(props: any) {
      super(props);
      this.state = {title: '', body: '',  id: null, notes: []};
      this.loadNotes();
  }

  handleTitleChange = (e: any) => {
    this.setState({'title': e.target.value});
  };

  handleBodyChange = (e: any) => {
    this.setState({'body': e.target.value});
  };

  handleNoteSelection = (note: any) => {
    this.setState({title: note.title, body: note.body, id: note.id});
  };

  handleDelete = () => {
    if(this.state.id == null) return;
    let that = this;
    db.collection("notes").doc(this.state.id).delete().then(function() {
        let newNoteList = that.state.notes;
        newNoteList = newNoteList.filter((note: any) => note.id != that.state.id);
        that.setState({notes: newNoteList});
    }).catch(function(error: any) {
        console.error("Error removing document: ", error);
    });
  }

  handleCreateNote = () => {
    this.setState({title: '', body: '', id: null});
  }

  handleSave = () => {
    let that = this;
    db.collection("notes").add({
      title: this.state.title,
      body: this.state.body
    })
    .then(function(note: any) {
        let newNoteList = that.state.notes;
        newNoteList.push({title: that.state.title, body: that.state.body, id: note.id});
        that.setState({notes: newNoteList});
        console.log("Note written with ID: ", note.id);
    })
    .catch(function(error: any) {
        console.error("Error adding document: ", error);
    });
  };

  private loadNotes(){
    let fetchedNotes: any = [];
    db.collection("notes").get().then((res: any) => {
      res.forEach((note: any) => {
          fetchedNotes.push({ ...note.data(), id: note.id});
        }
      );
      this.setState({notes: fetchedNotes});
    }
    );
  }

  public render() {
    return (
      <div>
        <TitleBar onChange={this.handleTitleChange} title={this.state.title}/>
        <Grid container={true} spacing={0}>
          <Grid item={true} xs={2}>
            <LeftBar notes={this.state.notes} onClick={this.handleNoteSelection}/>
          </ Grid>
          <Grid item={true} xs={10}>
            <NotesField onChange={this.handleBodyChange} body={this.state.body}/>
            <Grid container={true}>
              <Grid item={true} xs={10} />
              <Grid item={true} xs={2}>
                <Button variant="fab" color="primary" aria-label="add" className={this.props.classes.button} onClick={this.handleCreateNote}>
                  <AddIcon />
                </Button>
                <Button className={this.props.classes.button} variant="fab" color="default" onClick={this.handleSave}>
                  <Save className={ this.props.classes.icon} />
                </Button>
                <Button className={this.props.classes.button} variant="fab" color="default" onClick={this.handleDelete}>
                   <DeleteIcon />
                </Button>
              </ Grid>
            </ Grid>
          </ Grid>
        </ Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
