import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.css';
import './bower_components/bootstrap-social/bootstrap-social.css';





ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
