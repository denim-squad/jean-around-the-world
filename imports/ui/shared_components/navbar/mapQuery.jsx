import React from 'react';
import './navbar.css'
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let value = 100;

class MapQuery extends React.Component {
    render() {
        return <div className="map-query-container"> 
        <div>
            {/* spacing */}
        </div>
        <div>
            RADIUS
        </div>
        <Slider value={value} />
        <div> 
            LOCATION
        </div>
        <div>
            <TextField
                className="address-field"
                placeholder="1111 East Mall, V6T 1T7"
                margin="normal"
                variant="filled"
            />
        </div>
        <Button>
            START
        </Button>
    </div>
    }
}

export default MapQuery;
