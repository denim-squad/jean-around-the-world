import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { BootstrapButton } from '../../.././shared_components/MUI/button/bootstrapButton';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hideModal } from '../../../.././redux/actions';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    justifyContent: 'center'
  },
}))(MuiDialogActions);


class CalendarContainer extends React.Component {
  constructor(props){
    super(props);
  }

  addToCalendar = async () => {
    //TODO: implement
  }

  render() {
    return (
        <Dialog
          open={this.props.isModalShown}
          onClose={this.props.hideModal}
          aria-labelledby="customized-dialog-title"
          fullWidth={true}
          maxWidth = {'xs'}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.hideModal}>
            Add to Calendar
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select the preferred times for your trip event(s).
            </DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Date and Time"
                disablePast
              />
              {/* TODO: add date picker per event returned by API*/}
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <BootstrapButton
              variant="contained"
              size="small"
              color="primary">
              Add Event(s)
              {/* TODO: add event to calendar callback function*/}
            </BootstrapButton>
          </DialogActions>
        </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalShown: state.modal.isModalShown
  };
}

export default connect(mapStateToProps, { hideModal })(CalendarContainer);
