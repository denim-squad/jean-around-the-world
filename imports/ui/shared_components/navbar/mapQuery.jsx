import React from 'react';
import './navbar.css'
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const StyledSlider = withStyles({
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
  
  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#7D9FAE',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#7D9FAE',
      },
    },
  })(TextField);
  
  const BootstrapButton = withStyles({
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

class MapQuery extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 50,
        };
    }

    changeRadius = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return <div className="map-query-container"> 
        <div>
            {/* spacing */}
        </div>
        <div className="query-label-text">
            RADIUS
        </div>
        <StyledSlider 
            value={value} 
            onChange={this.changeRadius} 
            aria-labelledby="radius slider"
            className="slider"
        />
        <div className="query-label-text"> 
            LOCATION
        </div>
        <div>
            <CssTextField
                className="address-field"
                placeholder="1111 East Mall, V6T 1T7"
                margin="none"
            />
        </div>
        <BootstrapButton
            disabled={this.props.isLocationEmpty}
            variant="contained"
            size="small"
            color="primary">
            START
        </BootstrapButton>
    </div>
    }
}

export default MapQuery;
