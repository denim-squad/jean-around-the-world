import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 20,
      padding: '6px 6px',
      lineHeight: 1.5,
      backgroundColor: '#47C8FF',
      borderRadius: 436,
      fontFamily: [
        'Rubik',
        'sans-serif',
      ].join(','),
      '&:hover': {
        backgroundColor: '#009de1',
      },
    },
})(Button);
