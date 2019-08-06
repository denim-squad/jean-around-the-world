import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import {
  hideModal, savePrevTravel,
} from '../../../redux/actions';


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
    paddingBottom: 0,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
  },
}))(MuiDialogActions);

class SaveTravelName extends React.Component {
  constructor(props) {
    super(props);
    this.travelName = React.createRef();
  }

  saveTravel = () => {
    this.props.savePrevTravel({ name: this.travelName.value, places: this.props.places },
      this.props.userId);
    this.props.hideModal();
  }

  render() {
    return (
      <Dialog
        open={this.props.isModalShown}
        onClose={this.props.hideModal}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.hideModal}
        >
              What do you want to name this adventure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Enter name below.
          </DialogContentText>
          <TextField
            inputRef={input => (this.travelName = input)}
            margin="dense"
            label="Travel Name"
            type="email"
            fullWidth
            required
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.saveTravel();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <BootstrapButton
            onClick={this.saveTravel}
            variant="contained"
            size="small"
            color="primary"
          >
              Save Travel
          </BootstrapButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  isModalShown: state.modal.isModalShown,
  places: state.placeSearch.places,
  userId: state.user.userId,
});

export default connect(mapStateToProps, { hideModal, savePrevTravel })(SaveTravelName);
