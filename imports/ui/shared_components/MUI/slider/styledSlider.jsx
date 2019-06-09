import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const StyledSlider = withStyles({
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '5px solid #7D9FAE',
      '&$focused, &:hover': {
        boxShadow: `0px 0px 0px ${8}px ${fade('#54afd7', 0.16)}`,
      },
      '&$activated': {
        boxShadow: `0px 0px 0px ${8 * 1.5}px ${fade('#54afd7', 0.16)}`,
      },
      '&$jumped': {
        boxShadow: `0px 0px 0px ${8 * 1.5}px ${fade('#54afd7', 0.16)}`,
      },
    },
    track: {
      backgroundColor: '#47C8FF',
      height: 8,
    },
    trackAfter: {
      backgroundColor: '#d0d7dc',
    },
    focused: {},
    activated: {},
    jumped: {},
})(Slider);