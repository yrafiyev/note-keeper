import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

class LeftBar extends React.Component<{notes: any, onClick: any}> {

  public render(){

    const noteList: any = this.props.notes.map((note: any, index: any) =>
      <div key={note.id}>
        <ListItem button={true} onClick={() => this.props.onClick(note)}>
          <ListItemText primary={note.title} />
        </ListItem>
        <Divider />
      </div>
    );

    return (
      <div>
        <List component="nav">
          {noteList}
        </List>
      </div>
    );
  }
}

export default LeftBar;
