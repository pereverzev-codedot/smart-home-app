import React from 'react';
import { Switch } from '@material-ui/core';
import './settings-panel.css';
const SettingsPanel = () => {
	return (
		<div className='settings-panel'>
			<div className='settings-change'>
				<div className='switch-container'>
					<span className='switch-text'>
						Dark theme
					</span>
					<Switch classname='switch' />
				</div>
			</div>
			<div className='app-info'>
				<span className='info-text'>
					Инфа о проге
				</span>
			</div>
		</div>
	);
};

export default SettingsPanel;
