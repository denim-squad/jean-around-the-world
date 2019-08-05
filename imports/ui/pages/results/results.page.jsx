import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import ResultsMapContainer from './components/resultsMapContainer';
import ResultsButtons from './components/resultsButtons';
import './results.page.css';

class ResultsPage extends React.Component {
  render() {
    return (
      <div className="results-page-container">
        <Navbar />
        <ResultsButtons />
        <ResultsMapContainer />
      </div>
    );
  }
}

export default ResultsPage;
