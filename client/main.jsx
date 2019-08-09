import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../imports/redux/reducers';
import RoutingPage from '../imports/ui/pages/routing.page';
import './main.css';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import LoadingSpinner from '../imports/ui/shared_components/loading/loadingSpinner';

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducers);

Meteor.startup(() => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <RoutingPage />
      </PersistGate>
    </Provider>,
    document.getElementById("react-target")
  );
});