import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';


const styles = {
  input: {
    "color" : "white",
    "font-size" : "x-large",
  },
};

class TitleBar extends React.Component<{classes: any, onChange: any, title: string}> {

  public handleChange = (e: any) => {this.props.onChange(e)};

  public render(){
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="default">
              <Input value={this.props.title} placeholder="Title" color="default"  onChange={this.handleChange}  className={this.props.classes.input}/>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBar);
