import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

export const CssCheckbox =  withStyles({
    root: {
        color: '#009688 !important',
        '&:hover': {
          backgroundColor: '#8BCFC9 !important',
        },
    },
})(Checkbox);