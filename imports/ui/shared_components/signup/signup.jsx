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
import { hideModal } from '../../.././redux/actions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


class Signup extends React.Component {

  handleClose = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isModalShown}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          fullWidth={true}
          maxWidth = {'xs'}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}>
            New here? Sign up now!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create your free account below.
            </DialogContentText>
            <TextField
              margin="dense"
              id="firstname"
              label="First Name"
              type="firstname"
              fullWidth
            />
            <TextField
              margin="dense"
              id="lastname"
              label="Last Name"
              type="lastname"
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <BootstrapButton
              onClick={this.handleClose}
              variant="contained"
              size="small"
              color="primary">
              Sign Up
            </BootstrapButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalShown: state.modal.isModalShown
  };
}

export default connect(mapStateToProps, { hideModal })(Signup);
