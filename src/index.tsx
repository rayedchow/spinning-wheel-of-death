import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import Store from './data/Store';

ReactDOM.render(
	<React.StrictMode>
		<Store>
			<App />
		</Store>
	</React.StrictMode>,
	document.getElementById('root')
);
