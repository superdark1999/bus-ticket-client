import React from 'react';
// import useUserHook from 'hooks/useUserHook';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes';
import './App.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  // const { loading, email } = useUserHook();
  // console.log("email: ", email);
  // console.log("loading: ", loading);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}

export default App;
