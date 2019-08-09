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
import { randomPlaces } from './resultsMapContainer';

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

const event = {
  title: 'Jean Around the World Trip',
  location: 'Portland, OR',
};

event.startTime = moment(new Date()).format();
event.endTime = moment(new Date()).format();

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: format(new Date(), 'Y-MM-dd h:mm a'),
      startDate: format(new Date(), 'Y-MM-dd h:mm a'),
      endDate: format(new Date(), 'Y-MM-dd h:mm a'),
    };
  }

  onChangeStart = (date) => {
    this.setState({
      startDate: format(date, 'Y-MM-dd h:mm a'),
    });
    console.log('startdate is:', this.state.startDate);
    event.startTime = moment(date).format();
  }

  onChangeEnd = (date) => {
    this.setState({
      endDate: format(date, 'Y-MM-dd h:mm a'),
    });
    event.endTime = moment(date).format();
  }

  createCurrEvent = (location, address) => {
    const currEvent = {
      title: 'Jean Around the World Trip',
      location: `${location}, ${address}`,
      startTime: this.state.startDate,
      endTime: this.state.endDate,
    };
    return currEvent;
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
                (randomPlaces) => {
                  if (randomPlaces === undefined || randomPlaces.length < 1) {
                    return <DialogContentText>No Event(s) Found</DialogContentText>;
                  }
                },
                randomPlaces.map((place) => {
                  let currEvent = this.createCurrEvent(place.name, place.address);
                  return <div>
                  <DialogContentText className="place-name">{place.name}</DialogContentText>
                  <Grid container className={classes.grid} justify="space-around">
                    <DateTimePicker
                      onChange={this.onChangeStart}
                      label="Start"
                      minDate={this.state.minDate}
                      value={this.state.startDate}
                    />
                    <DateTimePicker
                      onChange={this.onChangeEnd}
                      label="End"
                      minDate={this.state.startDate}
                      value={this.state.endDate}
                    />
                    <AddToCalendar
                      className="addToCalendar-button"
                      event={/* TODO: match up to list of events returned */
                           currEvent
                         }
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
