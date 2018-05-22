import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = {
  input: {
    "font-size" : "large",
  },
};

class NotesField extends React.Component<{classes: any, onChange: any, body: string}> {

  public handleChange = (e: any) => {this.props.onChange(e)};

  public render(){
    return (
      <Input className={this.props.classes.input}
                 fullWidth={true}
                 multiline={true}
                 rows={30}
                 onChange={this.handleChange}
                 value={this.props.body} />
    );
  }
}

export default withStyles(styles)(NotesField);
