import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { connect } from 'react-redux';

const history = createBrowserHistory({forceRefresh: true});

class ResultsButtons extends React.Component {

    goToHomePage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/');
        }, 2800);
    }

    render() {
        // todo remove when api call working
        const { places } = this.props;
        console.log("places:", places);
        return <div className="results-container">
            WE FOUND JUST THE TRIP FOR YOU!
            <div className="results-buttons-container">
               <div>
                  {/* todo major styling, decisions about how to format, what to display, etc */}
                  
               </div>
               <BootstrapButton
                   className="save-trip-button"
                   variant="contained"
                   size="small"
                   color="primary">
                   SAVE TRIP
               </BootstrapButton>
               <div>
                  {/* spacing  */}
               </div>
               <BootstrapButton
                   className="add-calendar-button"
                   variant="contained"
                   size="small"
                   color="primary">
                   ADD TO CALENDAR
               </BootstrapButton>
               <div>
                  {/* spacing  */}
               </div>
               <BootstrapButton
                   className="new-trip-button"
                   variant="contained"
                   size="small"
                   color="primary"
                   onClick={this.goToHomePage}>
                   NEW TRIP
               </BootstrapButton>
               <div>
                  {/* spacing  */}
               </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return { places: state.places }
}

export default connect(mapStateToProps)(ResultsButtons);
