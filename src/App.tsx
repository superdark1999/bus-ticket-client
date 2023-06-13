import React, { Suspense } from 'react';
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
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Suspense fallback={<div>loading</div>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
