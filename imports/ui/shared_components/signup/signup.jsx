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
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hideModal, signupUser } from '../../.././redux/actions';

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


class Signup extends React.Component {
  constructor(props){
    super(props);
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }

  signupUser = async () => {
    if (this.firstName.value && this.lastName.value
      && this.email.value && this.password.value) {
        // add loadingSpinner: "Signing you up, welcome..."
        await setTimeout(() => {
          this.props.signupUser(this.firstName.value, this.lastName.value, this.email.value, this.password.value);
          this.props.hideModal();
        }, 1400);

      }
    else {
      alert("Please fill in the missing fields to proceed");
    }
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
            New here? Sign up now!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create your free account below.
            </DialogContentText>
            <TextField
              inputRef = {(input) => (this.firstName = input)}
              margin="dense"
              id="firstname"
              label="First Name"
              type="firstname"
              fullWidth
              required={true}
            />
            <TextField
              inputRef = {(input) => (this.lastName = input)}
              margin="dense"
              id="lastname"
              label="Last Name"
              type="lastname"
              fullWidth
              required={true}
            />
            <TextField
              inputRef = {(input) => (this.email = input)}
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              required={true}
            />
            <TextField
              inputRef = {(input) => (this.password = input)}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              required={true}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  this.signupUser();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <BootstrapButton
              onClick={this.signupUser}
              variant="contained"
              size="small"
              color="primary">
              Sign Up
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

export default connect(mapStateToProps, { hideModal, signupUser })(Signup);
