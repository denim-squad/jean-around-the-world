import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomePage from './home/home.page';
import AboutPage from './about/about.page';
import PreferencesPage from './preferences/preferences.page';
import ProfilePage from './profile/profile.page';
import ResultsPage from './results/results.page';

function RoutingPage() {
  return (
    <BrowserRouter>
    {/* TODO: enable once pages finished? */}
      <Route path="/about" component={AboutPage} />
      <Route path="/preferences" component={PreferencesPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/results" component={ResultsPage} />
      <Route exact path="/" component={HomePage} />
    </BrowserRouter>
  );
}

export default RoutingPage;
