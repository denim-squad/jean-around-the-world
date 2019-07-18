import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import ResultsMapContainer from './components/resultsMapContainer';
import './results.page.css';

class ResultsPage extends React.Component {
    render() {
        return (
          <div className="results-page-container">
            <Navbar />
            <ResultsMapContainer />
        </div>);
    }
}

export default ResultsPage;
