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
import { Meteor } from 'meteor/meteor';
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import {
  showModal, hideModal, loginUser, SIGNUP,
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
  }

  loginUser = () => {
    Meteor.loginWithPassword(this.email.value, this.password.value, (err) => {
      if (err) {
        alert('Invalid email or password');
      } else {
        this.props.loginUser(this.email.value);
        this.props.hideModal();
      }
    });
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
              Log in to your Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Enter your details below.
          </DialogContentText>
          <TextField
            inputRef={input => (this.email = input)}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            required
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.loginUser();
              }
            }}
          />
          <TextField
            inputRef={input => (this.password = input)}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            required
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.loginUser();
              }
            }}
          />
          <DialogContentText id="link-to-signup">
            <a href="#" onClick={() => this.props.showModal(SIGNUP)}>
                Don't have an account yet? Register now!
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BootstrapButton
            onClick={this.loginUser}
            variant="contained"
            size="small"
            color="primary"
          >
              Log In
          </BootstrapButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  isModalShown: state.modal.isModalShown,
});

export default connect(mapStateToProps, { showModal, hideModal, loginUser })(Login);
