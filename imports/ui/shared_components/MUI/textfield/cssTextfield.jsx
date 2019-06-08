import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#7D9FAE',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#7D9FAE',
      },
    },
})(TextField);