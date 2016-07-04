import ReactDOM from 'react-dom';
import React from 'react';

import App from 'container/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.querySelector('#app')
  );
});
