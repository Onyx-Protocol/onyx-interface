import BigNumber from 'bignumber.js';
import { Buffer } from 'buffer';
import process from 'process';
import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/styles/index.scss';
import App from 'pages/App';

window.Buffer = Buffer;
window.process = process;

// Initialize BigNumber format
BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSize: 3,
    groupSeparator: ',',
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
