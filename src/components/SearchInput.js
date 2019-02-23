import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class SearchInput extends React.Component {

  handleChange = (event) => {
    this.props.onChangeValue(event.target.value)
  };
  
  render() {
    const { classes } = this.props;
    return (
         <TextField
          id="search-id"
          label="category, title, description, tags"
          className={classes.textField}
          style={{ width: '80%' }}
          onChange={this.handleChange}
        />
    );
  }
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired
};

export default withStyles()(SearchInput);
