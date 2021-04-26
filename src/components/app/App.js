import React from 'react';
import { Route, Switch } from 'react-router';
import NavBar from '../nav-bar';
import {
	SettingsPage,
	MainPage,
	LoginPage,
	RegistrationPage,
} from '../../pages';
import './app.css';

const App = () => {
	return (
		<div className='main-content'>
			<NavBar />
			<div className='container'>
				<Switch>
					<Route
						path='/'
						exact
						component={MainPage}
					/>
					<Route
						path='/settings'
						component={SettingsPage}
					/>
					<Route
						path='/login'
						component={LoginPage}
					/>
					<Route
						path='/register'
						component={
							RegistrationPage
						}
					/>
				</Switch>
			</div>
		</div>
	);
};
export default App;
