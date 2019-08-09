import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

export const Chip =  withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 1
  },
})(Chip);
