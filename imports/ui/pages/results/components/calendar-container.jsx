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
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns'; // import
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { format } from 'date-fns';
import moment from 'moment';
import { hideModal } from '../../../../redux/actions';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { orderedPlaces } from './resultsMapContainer';

const styles = theme => ({
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
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const items = [
  { google: 'Google' },
];

const useStyles = makeStyles({
  grid: {
    width: '60%',
  },
});

const classes = () => {
  useStyles();
};

const icon = { 'calendar-plus-o': 'left' };

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: format(new Date(), 'Y-MM-dd hh:mm a'),
    };
  }

  onChangeStart = (date, place) => {
    this.setState({
      [place.address]: format(date, 'Y-MM-dd hh:mm a'),
    });
  }

  onChangeEnd = (date, place) => {
    this.setState({
      [place.place_id]: format(date, 'Y-MM-dd hh:mm a'),
    });
  }

  createCurrEvent = (id, address, name) => {
    const currEvent = {
      title: `${name}`,
      location: `${name}, ${address}`,
      startTime: moment(this.state[address]).format(),
      endTime: moment(this.state[id]).format(),
    };
    return currEvent;
  }

  createNewStateVar = async (place) => {
    if (this.state[place.address] !== undefined ||
      this.state[place.place_id] !== undefined) {
        //prevents infinite rendering loop
      return;
    }
    await this.setState({
      [place.address]: format(new Date(), 'Y-MM-dd hh:mm a'),
      [place.place_id]: format(new Date(), 'Y-MM-dd hh:mm a'),
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.isModalShown}
        onClose={this.props.hideModal}
        aria-labelledby="customized-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.hideModal}
        >
            Add to Calendar
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Select the preferred dates and times for your trip event(s).
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {
                (orderedPlaces) => {
                  if (orderedPlaces === undefined || orderedPlaces.length < 1) {
                    return <DialogContentText>No Event(s) Found</DialogContentText>;
                  }
                },
                orderedPlaces.map((place) => {
                  let currEvent = this.createCurrEvent(place.place_id, place.address, place.name);
                  this.createNewStateVar(place);
                  return <div>
                  <DialogContentText className="place-name">{place.name}</DialogContentText>
                  <Grid container className={classes.grid} justify="space-around">
                    <DateTimePicker
                      onChange={(date) => {this.onChangeStart(date, place)}}
                      label="Start"
                      minDate={this.state.minDate}
                      value={this.state[place.address]}
                    />
                    <DateTimePicker
                      onChange={(date) => {this.onChangeEnd(date, place)}}
                      label="End"
                      minDate={this.state[place.address]}
                      value={this.state[place.place_id]}
                    />
                    <AddToCalendar
                      className="addToCalendar-button"
                      event={currEvent}
                      buttonTemplate={icon}
                      listItems={items}
                    />
                  </Grid>
                 </div>
                })
              }
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  isModalShown: state.modal.isModalShown,
});

export default connect(mapStateToProps, { hideModal })(CalendarContainer);
