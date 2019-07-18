import React from 'react';
import '../results.page.css';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';

class ResultsButtons extends React.Component {
    render() {
        return <div className="results-container">
            WE FOUND JUST THE TRIP FOR YOU!
            <div className="results-buttons-container">
               <div>
                  {/* spacing  */}
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
                   color="primary">
                   NEW TRIP
               </BootstrapButton>
               <div>
                  {/* spacing  */}
               </div>
            </div>
        </div>;
    }
}

export default ResultsButtons;
