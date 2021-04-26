import React from 'react';
import AccountPanel from '../account-panel';
import SettingsPanel from '../settings-panel';

const SettingsMain = () => {
	return (
		<div className='settings-main'>
			<AccountPanel />
			<SettingsPanel />
		</div>
	);
};

export default SettingsMain;
