import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

class NoteItem extends React.Component {

  public render(){
    return (
      <div>
        <ListItem button={true}>
          <ListItemText primary="Note 1" />
        </ListItem>
      </div>
    );
  }
}

export default NoteItem;
