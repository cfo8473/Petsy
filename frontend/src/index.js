import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import {
  fetchSentRequests,
  fetchReceivedRequests,
  sendRequest,
  deleteRequest,
  approveRequest,
  denyRequest
} from './actions/requests_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureStore({});
  }

  window.fetchSentRequests = fetchSentRequests;
  window.fetchReceivedRequests = fetchReceivedRequests;
  window.sendRequest = sendRequest;
  window.deleteRequest = deleteRequest;
  window.approveRequest = approveRequest;
  window.denyRequest = denyRequest;
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store = { store } />, root);
});